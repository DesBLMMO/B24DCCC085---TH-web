import React, { useState } from 'react';
import { Button, Modal, Form, DatePicker, InputNumber, Table, Tag } from 'antd';

const HealthLog: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const calcBMI = (w: number, h: number) => {
    return +(w / Math.pow(h / 100, 2)).toFixed(1);
  };

  const getColor = (bmi: number) => {
    if (bmi < 18.5) return 'blue';
    if (bmi < 25) return 'green';
    if (bmi < 30) return 'gold';
    return 'red';
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const bmi = calcBMI(values.weight, values.height);

    setData([
      ...data,
      {
        key: Date.now(),
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        bmi,
      },
    ]);

    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm chỉ số
      </Button>

      <Table
        style={{ marginTop: 20 }}
        dataSource={data}
        columns={[
          { title: 'Ngày', dataIndex: 'date' },
          { title: 'Cân nặng', dataIndex: 'weight' },
          { title: 'Chiều cao', dataIndex: 'height' },
          {
            title: 'BMI',
            dataIndex: 'bmi',
            render: (bmi) => <Tag color={getColor(bmi)}>{bmi}</Tag>,
          },
        ]}
      />

      <Modal visible={visible} onCancel={() => setVisible(false)} onOk={handleSubmit}>
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Ngày"><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="weight" label="Cân nặng"><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="height" label="Chiều cao"><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HealthLog;