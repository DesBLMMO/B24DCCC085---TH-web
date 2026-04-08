import React, { useState } from 'react';
import { Button, List } from 'antd';
import type { Destination } from './types';

const data: Destination[] = [
  { id: 1, name: 'Đà Nẵng', type: 'biển', price: 2000000, rating: 4.5 },
  { id: 2, name: 'Đà Lạt', type: 'núi', price: 1500000, rating: 4.2 },
];

const Planner: React.FC = () => {
  const [plan, setPlan] = useState<Destination[]>([]);

  const add = (item: Destination) => setPlan([...plan, item]);

  const remove = (index: number) => {
    const newPlan = [...plan];
    newPlan.splice(index, 1);
    setPlan(newPlan);
  };

  return (
    <div>
      <h2>Lập kế hoạch</h2>

      {data.map(d => (
        <Button key={d.id} onClick={() => add(d)} style={{ margin: 5 }}>
          Thêm {d.name}
        </Button>
      ))}

      <List
        header="Lịch trình"
        dataSource={plan}
        renderItem={(item: Destination, index: number) => (
          <List.Item
            actions={[<Button danger onClick={() => remove(index)}>Xóa</Button>]}
          >
            {item.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Planner;