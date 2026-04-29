import React, { useState } from 'react';
import { Row, Col, Card, Tag, Modal, Button, Form, Input, Select } from 'antd';

const ExerciseLibrary: React.FC = () => {
  const [data, setData] = useState<any[]>([
    {
      key: 1,
      name: 'Push Up',
      muscle: 'Chest',
      difficulty: 'Dễ',
      description: 'Bài tập ngực cơ bản',
      calories: 250,
    },
  ]);

  const [selected, setSelected] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const getColor = (difficulty: string) => {
    if (difficulty === 'Dễ') return 'green';
    if (difficulty === 'Trung bình') return 'orange';
    return 'red';
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();

    setData([
      ...data,
      {
        key: Date.now(),
        ...values,
      },
    ]);

    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm bài tập
      </Button>

      <Row gutter={16} style={{ marginTop: 20 }}>
        {data.map(item => (
          <Col span={8} key={item.key}>
            <Card hoverable onClick={() => setSelected(item)}>
              <h3>{item.name}</h3>
              <p>{item.muscle}</p>
              <Tag color={getColor(item.difficulty)}>
                {item.difficulty}
              </Tag>
              <p>{item.description}</p>
              <p>{item.calories} kcal/giờ</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        visible={!!selected}
        footer={null}
        onCancel={() => setSelected(null)}
      >
        {selected && (
          <>
            <h2>{selected.name}</h2>
            <p>Nhóm cơ: {selected.muscle}</p>
            <p>Độ khó: {selected.difficulty}</p>
            <p>Mô tả: {selected.description}</p>
            <p>Calo: {selected.calories} kcal/giờ</p>
          </>
        )}
      </Modal>

      <Modal
        title="Thêm bài tập"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên bài tập">
            <Input />
          </Form.Item>

          <Form.Item name="muscle" label="Nhóm cơ">
            <Input />
          </Form.Item>

          <Form.Item name="difficulty" label="Mức độ">
            <Select>
              <Select.Option value="Dễ">Dễ</Select.Option>
              <Select.Option value="Trung bình">Trung bình</Select.Option>
              <Select.Option value="Khó">Khó</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input />
          </Form.Item>

          <Form.Item name="calories" label="Calo/giờ">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ExerciseLibrary;