import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Tag as AntTag,
  Space,
  Popconfirm,
  Modal,
  Typography,
  Badge,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Post, Tag } from "../types";
import PostForm from "../components/PostForm";

const { Title, Text } = Typography;
const { Option } = Select;

type Props = {
  posts: Post[];
  tags: Tag[];
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
};


const tagColors = ["blue", "green", "orange", "purple", "cyan", "magenta"];

export default function ManagePostsPage({
  posts,
  tags,
  addPost,
  updatePost,
  deletePost,
}: Props) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "published">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);


  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });


  function openAddModal() {
    setEditingPost(null);
    setModalOpen(true);
  }


  function openEditModal(post: Post) {
    setEditingPost(post);
    setModalOpen(true);
  }


  function closeModal() {
    setEditingPost(null);
    setModalOpen(false);
  }

  function handleSubmit(
    values: Omit<Post, "id" | "views" | "createdAt" | "author">
  ) {
    if (editingPost) {
      updatePost({ ...editingPost, ...values });
    } else {
      const newPost: Post = {
        id: "p" + Date.now(),
        author: "Minh",
        views: 0,
        createdAt: new Date().toISOString(),
        ...values,
      };
      addPost(newPost);
    }
    closeModal();
  }


  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Post) => (
        <div>
          <Text strong style={{ display: "block" }}>
            {text}
          </Text>
          <Text style={{ fontSize: 12, color: "#999" }}>{record.slug}</Text>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: string) =>
        status === "published" ? (
          <Badge status="success" text="Đã đăng" />
        ) : (
          <Badge status="default" text="Nháp" />
        ),
    },
    {
      title: "Thẻ",
      dataIndex: "tags",
      key: "tags",
      render: (tagIds: string[]) => (
        <div>
          {tagIds.map((id, idx) => {
            const tag = tags.find((t) => t.id === id);
            return tag ? (
              <AntTag
                key={id}
                color={tagColors[idx % tagColors.length]}
                style={{ marginBottom: 4 }}
              >
                {tag.name}
              </AntTag>
            ) : null;
          })}
        </div>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      width: 100,
      render: (views: number) => (
        <Text>
          <EyeOutlined style={{ marginRight: 4, color: "#1677ff" }} />
          {views}
        </Text>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date: string) =>
        new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      render: (_: any, record: Post) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title="Xóa bài viết?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => deletePost(record.id)}
            okButtonProps={{ danger: true }}
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Quản lý bài viết
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
          Thêm bài viết
        </Button>
      </div>

     
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm theo tiêu đề..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 280 }}
        />
        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          style={{ width: 160 }}
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="published"> Đã đăng</Option>
          <Option value="draft"> Nháp</Option>
        </Select>
        <Text style={{ color: "#999", lineHeight: "32px" }}>
          {filtered.length} bài viết
        </Text>
      </div>

     
      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: 700 }}
      />

      
      <Modal
        title={editingPost ? " Sửa bài viết" : " Thêm bài viết mới"}
        visible={modalOpen}
        onCancel={closeModal}
        footer={null}
        width={700}
        destroyOnClose
      >
        <PostForm
          initialValues={editingPost || undefined}
          tags={tags}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}