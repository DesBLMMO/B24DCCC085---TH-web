import { Tag as AntTag, Typography, Space } from "antd";
import { EyeOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { Post, Tag } from "../types";

const { Text, Title, Paragraph } = Typography;

type Props = {
  post: Post;
  tags: Tag[];
  onClickTag: (tagId: string) => void;
  onClick: () => void;
};

const tagColors = [
  "blue", "green", "orange", "purple", "cyan",
  "magenta", "red", "gold", "lime", "geekblue",
];

export default function PostCard({ post, tags, onClickTag, onClick }: Props) {
  const postTags = tags.filter((t) => post.tags.includes(t.id));

  const date = new Date(post.createdAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        padding: "20px",
        cursor: "pointer",
        border: "1px solid #f0f0f0",
        transition: "box-shadow 0.2s, border-color 0.2s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 20px rgba(0,0,0,0.1)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#1677ff";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#f0f0f0";
      }}
      onClick={onClick}
    >

      <div style={{ marginBottom: 10 }}>
        {postTags.map((tag, idx) => (
          <AntTag
            key={tag.id}
            color={tagColors[idx % tagColors.length]}
            style={{ cursor: "pointer", marginBottom: 4 }}
            onClick={(e) => {
              e.stopPropagation();
              onClickTag(tag.id);
            }}
          >
            {tag.name}
          </AntTag>
        ))}
      </div>


      <Title
        level={5}
        style={{ marginBottom: 8, marginTop: 0, color: "#1a1a2e" }}
      >
        {post.title}
      </Title>


      <Paragraph
        style={{ color: "#666", fontSize: 13, flex: 1, marginBottom: 12 }}
        ellipsis={{ rows: 2 }}
      >
        {post.summary}
      </Paragraph>


      <div
        style={{
          borderTop: "1px solid #f0f0f0",
          paddingTop: 10,
          marginTop: "auto",
        }}
      >
        <Space size={16} wrap>
          <Text style={{ fontSize: 12, color: "#999" }}>
            <UserOutlined style={{ marginRight: 4 }} />
            {post.author}
          </Text>
          <Text style={{ fontSize: 12, color: "#999" }}>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {date}
          </Text>
          <Text style={{ fontSize: 12, color: "#999" }}>
            <EyeOutlined style={{ marginRight: 4 }} />
            {post.views} lượt xem
          </Text>
        </Space>
      </div>
    </div>
  );
}