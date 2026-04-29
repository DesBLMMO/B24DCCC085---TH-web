import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Popconfirm,
  Modal,
  Form,
  Typography,
  Tag as AntTag,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Post, Tag } from "../types";

const { Title, Text } = Typography;

type Props = {
  tags: Tag[];
  posts: Post[];
  addTag: (tag: Tag) => void;
  updateTag: (tag: Tag) => void;
  deleteTag: (id: string) => void;
};

const tagColors = ["blue", "green", "orange", "purple", "cyan", "magenta", "red", "gold"];

export default function ManageTagsPage({
  tags,
  posts,
  addTag,
  updateTag,
  deleteTag,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [form] = Form.useForm();

  function countPostsByTag(tagId: string) {
    return posts.filter((p) => p.tags.includes(tagId)).length;
  }

  function openAddModal() {
    setEditingTag(null);
    form.resetFields();
    setModalOpen(true);
  }


  function openEditModal(tag: Tag) {
    setEditingTag(tag);
    form.setFieldsValue({ name: tag.name });
    setModalOpen(true);
  }


  function closeModal() {
    setEditingTag(null);
    form.resetFields();
    setModalOpen(false);
  }


  function handleSubmit(values: { name: string }) {
    if (editingTag) {
      updateTag({ ...editingTag, name: values.name });
    } else {
      const newTag: Tag = {
        id: "t" + Date.now(),
        name: values.name,
      };
      addTag(newTag);
    }
    closeModal();
  }


  const columns = [
    {
      title: "Tên thẻ",
      dataIndex: "name",
      key: "name",
      render: (name: string, _record: Tag, idx: number) => (
        <AntTag
          icon={<TagOutlined />}
          color={tagColors[idx % tagColors.length]}
          style={{ fontSize: 13, padding: "4px 10px" }}
        >
          {name}
        </AntTag>
      ),
    },
    {
      title: "Số bài viết",
      key: "count",
      width: 150,
      render: (_: any, record: Tag) => {
        const count = countPostsByTag(record.id);
        return (
          <Text>
            <strong style={{ color: "#1677ff" }}>{count}</strong> bài viết
          </Text>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      render: (_: any, record: Tag) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title={`Xóa thẻ "${record.name}"? Bài viết dùng thẻ này sẽ không còn thẻ đó.`}
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => deleteTag(record.id)}
            okButtonProps={{ danger: true }}
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
           Quản lý tag
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
          Thêm thẻ
        </Button>
      </div>


      <div
        style={{
          background: "#f6f8ff",
          border: "1px solid #d0e4ff",
          borderRadius: 10,
          padding: "16px 20px",
          marginBottom: 24,
        }}
      >
        <Text style={{ color: "#666", marginRight: 8 }}>Tất cả thẻ:</Text>
        {tags.map((tag, idx) => (
          <AntTag
            key={tag.id}
            color={tagColors[idx % tagColors.length]}
            style={{ marginBottom: 6 }}
          >
            {tag.name} ({countPostsByTag(tag.id)})
          </AntTag>
        ))}
      </div>

      <Table
        dataSource={tags}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />

      <Modal
        title={editingTag ? " Sửa thẻ" : " Thêm thẻ mới"}
        visible={modalOpen}
        onCancel={closeModal}
        footer={null}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            label="Tên thẻ"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên thẻ!" }]}
          >
            <Input placeholder="Ví dụ: Array, Stack, Sorting..." />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Button onClick={closeModal}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}