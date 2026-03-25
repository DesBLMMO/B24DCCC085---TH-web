import React from 'react';
import { Table, Form, Input, Select, Button, message } from 'antd';
import { FieldType, FieldConfig } from '../types';
import { generateId } from '../utils/helpers';

interface Props {
  fieldConfigs: FieldConfig[];
  setFieldConfigs: React.Dispatch<React.SetStateAction<FieldConfig[]>>;
}

const CauHinhPhuLuc: React.FC<Props> = ({ fieldConfigs, setFieldConfigs }) => {
  const [form] = Form.useForm();

  // Hàm tạo mã trường từ tên (VD: "Dân tộc" -> "dan_toc")
  const generateFieldCode = (name: string) => {
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '_');
  };

  const onFinish = (values: { name: string; type: FieldType }) => {
    const newConfig: FieldConfig = {
      id: generateId(),
      fieldCode: generateFieldCode(values.name), // Nâng cấp: Tạo mã code chuẩn JSON
      name: values.name,
      type: values.type,
    };
    
    setFieldConfigs([...fieldConfigs, newConfig]);
    form.resetFields();
    message.success('Thêm trường cấu hình thành công!');
  };

  const columns = [
    { title: 'Tên hiển thị', dataIndex: 'name', key: 'name' },
    { title: 'Mã trường (JSON Key)', dataIndex: 'fieldCode', key: 'fieldCode' },
    { title: 'Kiểu dữ liệu', dataIndex: 'type', key: 'type' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: FieldConfig) => (
        <Button danger size="small" onClick={() => setFieldConfigs(fieldConfigs.filter(f => f.id !== record.id))}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Form form={form} layout="inline" onFinish={onFinish} style={{ marginBottom: 20 }}>
        <Form.Item name="name" rules={[{ required: true, message: 'Nhập tên trường' }]}>
          <Input placeholder="Tên trường (VD: Dân tộc, Nơi sinh)" style={{ width: 250 }} />
        </Form.Item>
        <Form.Item name="type" rules={[{ required: true, message: 'Chọn kiểu dữ liệu' }]}>
          <Select placeholder="Kiểu dữ liệu" style={{ width: 150 }}>
            <Select.Option value="string">Văn bản (String)</Select.Option>
            <Select.Option value="number">Số (Number)</Select.Option>
            <Select.Option value="date">Ngày tháng (Date)</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Thêm trường mới</Button>
        </Form.Item>
      </Form>
      <Table dataSource={fieldConfigs} columns={columns} rowKey="id" bordered />
    </div>
  );
};

export default CauHinhPhuLuc;