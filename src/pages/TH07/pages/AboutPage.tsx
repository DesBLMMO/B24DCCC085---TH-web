import {
  Row,
  Col,
  Typography,
  Tag as AntTag,
  Avatar,
  Divider,
  Space,
  Card,
} from "antd";
import {
  GithubOutlined,
  MailOutlined,
  CodeOutlined,
  BookOutlined,
  TrophyOutlined,
  RocketOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const author = {
  name: "Nguyễn Minh",
  role: "IT Student",
  bio: "Mình là sinh viên đam mê Cấu trúc Dữ liệu & Giải thuật. Blog này là nơi mình ghi chép lại những gì học được, với mong muốn chia sẻ kiến thức theo cách đơn giản và dễ hiểu nhất.",
  skills: [
    { name: "TypeScript / JavaScript" },
    { name: "Cấu trúc Dữ liệu" },
    { name: "Giải thuật" },
    { name: "React" },
    { name: "Python" },
  ],
  topics: [
    "Array & String",
    "Linked List",
    "Stack & Queue",
    "Tree & Graph",
    "Sorting",
    "Searching",
    "Dynamic Programming",
    "Recursion",
    "Hash Table",
    "Heap",
  ],
  stats: [
    { icon: <BookOutlined />, label: "Bài viết", value: 14, color: "#1677ff" },
    { icon: <TrophyOutlined />, label: "Chủ đề CTDL", value: 10, color: "#52c41a" },
    { icon: <CodeOutlined />, label: "Code mẫu", value: 40, color: "#fa8c16" },
    { icon: <RocketOutlined />, label: "Năm học", value: 3, color: "#eb2f96" },
  ],
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          borderRadius: 16,
          padding: "48px",
          marginBottom: 32,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} sm={6} style={{ textAlign: "center" }}>
            <Avatar
              size={120}
              style={{
                background: "linear-gradient(135deg, #ffffff, #ffffff)",
                fontSize: 48,
                fontWeight: 700,
              }}
              src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3Aurpmqpct_FXIGWe0nFHjCDzHFg2qrrJA&s"
            />
          </Col>
          <Col xs={24} sm={18}>
            <Text style={{ color: "#91caff", fontSize: 14 }}>
              <CodeOutlined style={{ marginRight: 6 }} />
              {author.role}
            </Text>
            <Title level={1} style={{ color: "#fff", margin: "8px 0" }}>
              {author.name}
            </Title>
            <Paragraph
              style={{
                color: "#adb5bd",
                fontSize: 15,
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              {author.bio}
            </Paragraph>
            <Space size={12}>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <AntTag
                  icon={<GithubOutlined />}
                  color="default"
                  style={{
                    cursor: "pointer",
                    padding: "4px 12px",
                    fontSize: 13,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                  }}
                >
                  GitHub
                </AntTag>
              </a>
              <a href="mailto:dev@example.com">
                <AntTag
                  icon={<MailOutlined />}
                  color="default"
                  style={{
                    cursor: "pointer",
                    padding: "4px 12px",
                    fontSize: 13,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                  }}
                >
                  Email
                </AntTag>
              </a>
            </Space>
          </Col>
        </Row>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {author.stats.map((stat, idx) => (
          <Col key={idx} xs={12} sm={6}>
            <Card
              style={{
                textAlign: "center",
                borderRadius: 12,
                border: `2px solid ${stat.color}20`,
              }}
            >
              <div style={{ fontSize: 28, color: stat.color, marginBottom: 4 }}>
                {stat.icon}
              </div>
              <Title level={2} style={{ margin: 0, color: stat.color }}>
                {stat.value}
              </Title>
              <Text style={{ color: "#666", fontSize: 13 }}>{stat.label}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              border: "1px solid #f0f0f0",
              height: "100%",
            }}
          >
            <Title level={4} style={{ marginTop: 0 }}>
              Kỹ năng
            </Title>
            <Divider style={{ margin: "12px 0 20px" }} />
            {author.skills.map((skill, idx) => (
              <div key={idx} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <Text style={{ fontWeight: 500 }}>{skill.name}</Text>
                </div>
              </div>
            ))}
          </div>
        </Col>


        <Col xs={24} md={12}>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              border: "1px solid #f0f0f0",
              height: "100%",
            }}
          >
            <Title level={4} style={{ marginTop: 0 }}>
               Chủ đề nghiên cứu
            </Title>
            <Divider style={{ margin: "12px 0 20px" }} />
            <div>
              {author.topics.map((topic, idx) => {
                const colors = ["blue", "green", "orange", "purple", "cyan", "magenta"];
                return (
                  <AntTag
                    key={idx}
                    color={colors[idx % colors.length]}
                    style={{
                      marginBottom: 10,
                      padding: "6px 14px",
                      fontSize: 13,
                      borderRadius: 20,
                    }}
                  >
                    {topic}
                  </AntTag>
                );
              })}
            </div>

            <Divider />
            <Title level={5} style={{ marginTop: 0 }}>
               Mục tiêu của blog
            </Title>
            <ul style={{ color: "#555", lineHeight: 2 }}>
              <li>Ghi chép kiến thức CTDL & Giải thuật</li>
              <li>Phân tích độ phức tạp thời gian / không gian</li>
              <li>Mục tiêu chinh phục 3000 Red Codeforces</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
}