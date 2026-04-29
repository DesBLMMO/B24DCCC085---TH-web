import { useEffect } from "react";
import {
  Button,
  Tag as AntTag,
  Typography,
  Divider,
  Row,
  Col,
  Card,
  Space,
} from "antd";
import {
  ArrowLeftOutlined,
  EyeOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Post, Tag } from "../types";

const { Title, Text } = Typography;

type Props = {
  post: Post;
  posts: Post[];
  tags: Tag[];
  onBack: () => void;
  onReadPost: (post: Post) => void;
  increaseView: (id: string) => void;
};

const tagColors = [
  "blue", "green", "orange", "purple", "cyan",
  "magenta", "red", "gold", "lime", "geekblue",
];

export default function DetailPage({
  post,
  posts,
  tags,
  onBack,
  onReadPost,
  increaseView,
}: Props) {

  useEffect(() => {
    increaseView(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [post.id, increaseView]);


  const postTags = tags.filter((t) => post.tags.includes(t.id));


  const date = new Date(post.createdAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });


  const related = posts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.status === "published" &&
        p.tags.some((t) => post.tags.includes(t))
    )
    .slice(0, 3);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
      {/* Nút quay lại */}
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        style={{ marginBottom: 24 }}
      >
        Quay lại danh sách
      </Button>

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "40px",
          border: "1px solid #f0f0f0",
          marginBottom: 24,
        }}
      >

        <div style={{ marginBottom: 16 }}>
          {postTags.map((tag, idx) => (
            <AntTag key={tag.id} color={tagColors[idx % tagColors.length]}>
              {tag.name}
            </AntTag>
          ))}
        </div>


        <Title level={1} style={{ fontSize: 32, marginBottom: 16 }}>
          {post.title}
        </Title>


        <Space size={24} style={{ marginBottom: 24 }}>
          <Text style={{ color: "#666" }}>
            <UserOutlined style={{ marginRight: 6 }} />
            {post.author}
          </Text>
          <Text style={{ color: "#666" }}>
            <CalendarOutlined style={{ marginRight: 6 }} />
            {date}
          </Text>
          <Text style={{ color: "#666" }}>
            <EyeOutlined style={{ marginRight: 6 }} />
            {post.views + 1} lượt xem
          </Text>
        </Space>

        <Divider />

        <div
          style={{
            lineHeight: 1.8,
            fontSize: 16,
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {post.content.split('\n').map((line: string, idx: number) => {
            if (line.startsWith('# ')) {
              return (
                <h1 key={idx} style={{ color: "#1a1a2e", borderBottom: "2px solid #1677ff", paddingBottom: 8, marginTop: 24 }}>
                  {line.replace('# ', '')}
                </h1>
              );
            } else if (line.startsWith('## ')) {
              return (
                <h2 key={idx} style={{ color: "#1a1a2e", marginTop: 32 }}>
                  {line.replace('## ', '')}
                </h2>
              );
            } else if (line.startsWith('### ')) {
              return (
                <h3 key={idx} style={{ color: "#333" }}>
                  {line.replace('### ', '')}
                </h3>
              );
            } else if (line.trim() === '') {
              return <br key={idx} />;
            } else {
              return (
                <p key={idx} style={{ marginBottom: 12 }}>
                  {line}
                </p>
              );
            }
          })}
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <Title level={4} style={{ marginBottom: 16 }}>
             Bài viết liên quan
          </Title>
          <Row gutter={[16, 16]}>
            {related.map((r) => {
              const rTags = tags.filter((t) => r.tags.includes(t.id));
              const rDate = new Date(r.createdAt).toLocaleDateString("vi-VN");
              return (
                <Col key={r.id} xs={24} sm={8}>
                  <Card
                    hoverable
                    onClick={() => onReadPost(r)}
                    size="small"
                    style={{ height: "100%" }}
                  >
                    <div style={{ marginBottom: 8 }}>
                      {rTags.map((tag, idx) => (
                        <AntTag
                          key={tag.id}
                          color={tagColors[idx % tagColors.length]}
                          style={{ fontSize: 11 }}
                        >
                          {tag.name}
                        </AntTag>
                      ))}
                    </div>
                    <Text strong style={{ fontSize: 14, display: "block", marginBottom: 8 }}>
                      {r.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#999" }}>
                      <EyeOutlined style={{ marginRight: 4 }} />
                      {r.views} · {rDate}
                    </Text>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </div>
  );
}