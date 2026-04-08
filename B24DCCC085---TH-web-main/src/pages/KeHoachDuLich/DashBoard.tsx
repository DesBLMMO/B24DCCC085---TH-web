import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

interface Item {
  key: number;
  name: string;
}

const Admin: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [open, setOpen] = useState<boolean>(false);
const [form] = Form.useForm<Item>();

  const add = async () => {
    const values = await form.validateFields();
    setData([...data, { ...values, key: Date.now() }]);
    setOpen(false);
    form.resetFields();
  };

  const del = (key: number) => {
    setData(data.filter(item => item.key !== key));
  };

  return (
    <div>
      <h2>Admin</h2>

      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm điểm đến
      </Button>

      <Table<Item>
        dataSource={data}
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          {
            title: 'Action',
            render: (_, record) => (
              <Button danger onClick={() => del(record.key)}>Xóa</Button>
            ),
          },
        ]}
      />

<Modal visible={open} onOk={add} onCancel={() => setOpen(false)}>
        <Form form={form}>
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;