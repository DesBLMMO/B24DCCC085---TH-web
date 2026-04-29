import React, { useState } from 'react';
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Card,
  Progress,
  Row,
  Col,
  Popconfirm,
} from 'antd';

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();

    setGoals([
      ...goals,
      {
        key: Date.now(),
        ...values,
        currentValue: 0,
      },
    ]);

    setVisible(false);
    form.resetFields();
  };

  const updateCurrent = (value: number, key: number) => {
    setGoals(
      goals.map(item =>
        item.key === key ? { ...item, currentValue: value } : item
      )
    );
  };

  const deleteGoal = (key: number) => {
    setGoals(goals.filter(item => item.key !== key));
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm mục tiêu
      </Button>

      <Row gutter={16} style={{ marginTop: 20 }}>
        {goals.map(goal => {
          const percent = Math.min(
            Math.round((goal.currentValue / goal.targetValue) * 100),
            100
          );

          return (
            <Col span={8} key={goal.key}>
              <Card
                title={goal.name}
                extra={
                  <Popconfirm
                    title="Xóa mục tiêu?"
                    onConfirm={() => deleteGoal(goal.key)}
                  >
                    <a>Xóa</a>
                  </Popconfirm>
                }
              >
                <p>Loại: {goal.type}</p>
                <p>Mục tiêu: {goal.targetValue}</p>

                <InputNumber
                  style={{ width: '100%' }}
                  value={goal.currentValue}
                  onChange={(value: any) => updateCurrent(value || 0, goal.key)}
                />

                <Progress percent={percent} style={{ marginTop: 12 }} />
              </Card>
            </Col>
          );
        })}
      </Row>

      <Drawer
        title="Thêm mục tiêu"
        visible={visible}
        onClose={() => setVisible(false)}
        width={400}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên mục tiêu">
            <Input />
          </Form.Item>

          <Form.Item name="type" label="Loại">
            <Select>
              <Select.Option value="Giảm cân">Giảm cân</Select.Option>
              <Select.Option value="Tăng cơ">Tăng cơ</Select.Option>
              <Select.Option value="Sức bền">Sức bền</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="targetValue" label="Giá trị mục tiêu">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="deadline" label="Deadline">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Button type="primary" onClick={handleSubmit}>
            Lưu
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default Goals;