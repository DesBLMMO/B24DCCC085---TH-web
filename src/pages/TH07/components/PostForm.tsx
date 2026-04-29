import { Form, Input, Select, Button, Space } from "antd";
import { Post, Tag } from "../types";

const { TextArea } = Input;
const { Option } = Select;

type Props = {
  initialValues?: Partial<Post>;
  tags: Tag[];
  onSubmit: (values: Omit<Post, "id" | "views" | "createdAt" | "author">) => void;
  onCancel: () => void;
  loading?: boolean;
};

export default function PostForm({
  initialValues,
  tags,
  onSubmit,
  onCancel,
  loading,
}: Props) {
  const [form] = Form.useForm();

  function handleFinish(values: any) {
    onSubmit(values);
    form.resetFields();
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
      >
        <Input placeholder="Nhập tiêu đề bài viết..." />
      </Form.Item>

      <Form.Item
        label="Slug (URL)"
        name="slug"
        rules={[{ required: true, message: "Vui lòng nhập slug!" }]}
      >
        <Input placeholder="vi-du: array-mang-co-ban" />
      </Form.Item>

      <Form.Item
        label="Tóm tắt"
        name="summary"
        rules={[{ required: true, message: "Vui lòng nhập tóm tắt!" }]}
      >
        <TextArea rows={2} placeholder="Tóm tắt ngắn gọn về bài viết..." />
      </Form.Item>

      {/* Nội dung Markdown */}
      <Form.Item
        label="Nội dung (Markdown)"
        name="content"
        rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
      >
        <TextArea
          rows={12}
          placeholder="Viết nội dung bằng Markdown..."
          style={{ fontFamily: "monospace" }}
        />
      </Form.Item>

      <Form.Item label="Thẻ tag" name="tags">
        <Select mode="multiple" placeholder="Chọn các thẻ tag...">
          {tags.map((tag) => (
            <Option key={tag.id} value={tag.id}>
              {tag.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Trạng thái" name="status" initialValue="draft">
        <Select>
          <Option value="draft"> Nháp</Option>
          <Option value="published"> Đã đăng</Option>
        </Select>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            Lưu bài viết
          </Button>
          <Button onClick={onCancel}>Hủy</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}