import React, { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Table,
  Tag,
  Popconfirm,
} from 'antd';
import moment from 'moment';

const WorkoutLog: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();

    setData([
      ...data,
      {
        key: Date.now(),
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      },
    ]);

    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm buổi tập
      </Button>

      <Table
        style={{ marginTop: 20 }}
        dataSource={data}
        columns={[
          { title: 'Ngày', dataIndex: 'date' },
          { title: 'Loại', dataIndex: 'type' },
          { title: 'Thời lượng', dataIndex: 'duration' },
          { title: 'Calo', dataIndex: 'calories' },
          { title: 'Ghi chú', dataIndex: 'note' },
          {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text) => (
              <Tag color={text === 'Hoàn thành' ? 'green' : 'red'}>
                {text}
              </Tag>
            ),
          },
        ]}
      />

      <Modal visible={visible} onCancel={() => setVisible(false)} onOk={handleSubmit}>
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Ngày"><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="type" label="Loại"><Input /></Form.Item>
          <Form.Item name="duration" label="Thời lượng"><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="calories" label="Calo"><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="note" label="Ghi chú"><Input /></Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Select>
              <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
              <Select.Option value="Bỏ lỡ">Bỏ lỡ</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default WorkoutLog;