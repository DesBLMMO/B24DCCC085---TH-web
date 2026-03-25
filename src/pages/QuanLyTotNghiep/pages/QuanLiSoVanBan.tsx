import React from 'react';
import { Form, Input, InputNumber, Button, Table, message } from 'antd';
import { Registry } from '../types';
import { generateId } from '../utils/helpers';

interface Props {
  registries: Registry[];
  setRegistries: React.Dispatch<React.SetStateAction<Registry[]>>;
}

const QuanLySoVanBang: React.FC<Props> = ({ registries, setRegistries }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
   
    const isYearExists = registries.some(r => r.year === values.year);
    if (isYearExists) {
      message.error(`Lỗi: Đã tồn tại sổ văn bằng cho năm ${values.year}!`);
      return;
    }

    const newRegistry: Registry = {
      id: generateId(),
      name: values.name,
      year: values.year,
    };
    
    setRegistries([...registries, newRegistry]);
    form.resetFields();
    message.success('Thêm sổ văn bằng thành công!');
  };

  const columns = [
    { title: 'Tên Sổ Quản Lý', dataIndex: 'name', key: 'name' },
    { title: 'Năm áp dụng', dataIndex: 'year', key: 'year' },
  ];

  return (
    <div>
      <Form form={form} layout="inline" onFinish={onFinish} style={{ marginBottom: 20 }}>
        <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sổ' }]}>
          <Input placeholder="Tên sổ (VD: Sổ gốc 2026)" />
        </Form.Item>
        <Form.Item name="year" rules={[{ required: true, message: 'Vui lòng nhập năm' }]}>
          <InputNumber placeholder="Năm áp dụng" style={{ width: 150 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Tạo Sổ Mới</Button>
        </Form.Item>
      </Form>
      <Table dataSource={registries} rowKey="id" columns={columns} bordered />
    </div>
  );
};

export default QuanLySoVanBang;