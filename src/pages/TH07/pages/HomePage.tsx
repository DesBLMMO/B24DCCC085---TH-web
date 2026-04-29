import { useState, useCallback } from "react";
import {
  Row,
  Col,
  Pagination,
  Input,
  Typography,
  Tag as AntTag,
  Empty,
  Space,
  Divider,
} from "antd";
import { SearchOutlined, TagsOutlined } from "@ant-design/icons";
import { Post, Tag } from "../types";
import PostCard from "../components/PostCard";

const { Title, Text } = Typography;
const PAGE_SIZE = 9;

type Props = {
  posts: Post[];
  tags: Tag[];
  onReadPost: (post: Post) => void;
};

const tagColors = [
  "blue", "green", "orange", "purple", "cyan",
  "magenta", "red", "gold", "lime", "geekblue",
];

export default function HomePage({ posts, tags, onReadPost }: Props) {
  const [keyword, setKeyword] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
      setPage(1);
    },
    []
  );

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setKeyword(val);

    clearTimeout((window as any).__searchTimer);
    (window as any).__searchTimer = setTimeout(() => {
      handleSearch(val);
    }, 300);
  }

  function handleTagClick(tagId: string) {
    setActiveTag((prev) => (prev === tagId ? null : tagId));
    setPage(1);
  }

  const publishedPosts = posts.filter((p) => p.status === "published");


  const filtered = publishedPosts.filter((p) => {
    const matchKeyword =
      searchText === "" ||
      p.title.toLowerCase().includes(searchText.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchText.toLowerCase());

    const matchTag = activeTag === null || p.tags.includes(activeTag);

    return matchKeyword && matchTag;
  });


  const startIdx = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(startIdx, startIdx + PAGE_SIZE);


  function countPostsByTag(tagId: string) {
    return publishedPosts.filter((p) => p.tags.includes(tagId)).length;
  }

  return (
    <div>

      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          padding: "48px 0 32px",
          marginBottom: 0,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Title style={{ color: "#fff", margin: 0, fontSize: 36 }}>
             Blog CTDL & Giải thuật
          </Title>
          <Text style={{ color: "#adb5bd", fontSize: 16 }}>
            Hướng dẫn Cấu trúc Dữ liệu và Giải thuật bằng TypeScript
          </Text>

          <div style={{ marginTop: 24, maxWidth: 500 }}>
            <Input
              size="large"
              prefix={<SearchOutlined style={{ color: "#adb5bd" }} />}
              placeholder="Tìm kiếm bài viết..."
              value={keyword}
              onChange={onInputChange}
              style={{ borderRadius: 8 }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 0" }}>
        <Row gutter={[24, 0]}>
          <Col xs={24} lg={17}>
            {(searchText || activeTag) && (
              <div
                style={{
                  marginBottom: 16,
                  padding: "8px 16px",
                  background: "#e6f4ff",
                  borderRadius: 8,
                  border: "1px solid #91caff",
                }}
              >
                <Space>
                  <Text>
                    Tìm thấy <strong>{filtered.length}</strong> bài viết
                    {searchText && (
                      <>
                        {" "}cho từ khóa <strong>"{searchText}"</strong>
                      </>
                    )}
                    {activeTag && (
                      <>
                        {" "}trong tag{" "}
                        <strong>
                          {tags.find((t) => t.id === activeTag)?.name}
                        </strong>
                      </>
                    )}
                  </Text>
                  <AntTag
                    closable
                    onClose={() => {
                      setActiveTag(null);
                      setSearchText("");
                      setKeyword("");
                      setPage(1);
                    }}
                  >
                    Xóa bộ lọc
                  </AntTag>
                </Space>
              </div>
            )}

            {paginated.length === 0 ? (
              <Empty description="Không tìm thấy bài viết nào" style={{ marginTop: 60 }} />
            ) : (
              <Row gutter={[16, 16]}>
                {paginated.map((post) => (
                  <Col key={post.id} xs={24} sm={12} xl={8}>
                    <PostCard
                      post={post}
                      tags={tags}
                      onClickTag={handleTagClick}
                      onClick={() => onReadPost(post)}
                    />
                  </Col>
                ))}
              </Row>
            )}

            {filtered.length > PAGE_SIZE && (
              <div style={{ textAlign: "center", marginTop: 32, marginBottom: 32 }}>
                <Pagination
                  current={page}
                  pageSize={PAGE_SIZE}
                  total={filtered.length}
                  onChange={(p) => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  showSizeChanger={false}
                />
              </div>
            )}
          </Col>

          <Col xs={24} lg={7}>
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: "20px",
                border: "1px solid #f0f0f0",
                position: "sticky",
                top: 80,
              }}
            >
              <Title level={5} style={{ margin: 0, marginBottom: 16 }}>
                <TagsOutlined style={{ marginRight: 8, color: "#1677ff" }} />
                TAG PHỔ BIẾN
              </Title>
              <Divider style={{ margin: "0 0 16px" }} />
              <div>
                {tags.map((tag, idx) => {
                  const count = countPostsByTag(tag.id);
                  if (count === 0) return null;
                  return (
                    <AntTag
                      key={tag.id}
                      color={activeTag === tag.id ? tagColors[idx % tagColors.length] : "default"}
                      style={{
                        cursor: "pointer",
                        marginBottom: 8,
                        padding: "4px 10px",
                        fontSize: 13,
                        borderRadius: 20,
                        fontWeight: activeTag === tag.id ? 600 : 400,
                      }}
                      onClick={() => handleTagClick(tag.id)}
                    >
                      {tag.name}{" "}
                      <span
                        style={{
                          background: activeTag === tag.id ? "rgba(255,255,255,0.3)" : "#f0f0f0",
                          borderRadius: 10,
                          padding: "0 6px",
                          fontSize: 11,
                          marginLeft: 4,
                        }}
                      >
                        {count}
                      </span>
                    </AntTag>
                  );
                })}
              </div>

              <Divider />
              <div style={{ textAlign: "center" }}>
                <Text style={{ color: "#999", fontSize: 13 }}>
                  Tổng cộng{" "}
                  <strong style={{ color: "#1677ff" }}>{publishedPosts.length}</strong>{" "}
                  bài viết
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}