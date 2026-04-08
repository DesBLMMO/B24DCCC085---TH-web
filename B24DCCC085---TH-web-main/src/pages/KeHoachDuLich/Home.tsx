import React, { useState } from 'react';
import { Card, Row, Col, Select, Rate } from 'antd';
import type { Destination } from './types';

const data: Destination[] = [
  { id: 1, name: 'Đà Nẵng', type: 'biển', price: 2000000, rating: 4.5, image: 'https://picsum.photos/300' },
  { id: 2, name: 'Đà Lạt', type: 'núi', price: 1500000, rating: 4.2, image: 'https://picsum.photos/301' },
];

const Home: React.FC = () => {
  const [type, setType] = useState<string | undefined>();

  const filtered = type ? data.filter(d => d.type === type) : data;

  return (
    <div>
      <h2>Khám phá điểm đến</h2>

      <Select
        style={{ width: 200, marginBottom: 20 }}
        placeholder="Chọn loại"
        onChange={(value) => setType(value)}
        allowClear
      >
        <Select.Option value="biển">Biển</Select.Option>
        <Select.Option value="núi">Núi</Select.Option>
      </Select>

      <Row gutter={[16, 16]}>
        {filtered.map(item => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            <Card cover={<img src={item.image} alt="img" />}>
              <h3>{item.name}</h3>
              <p>Giá: {item.price}</p>
              <Rate value={item.rating} disabled />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;