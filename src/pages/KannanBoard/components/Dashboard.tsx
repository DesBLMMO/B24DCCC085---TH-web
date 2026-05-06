import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { Task } from '../types';

interface DashboardProps {
  tasks: Task[];
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const overdueTasks = tasks.filter(t => t.status !== 'done' && new Date(t.deadline) < new Date()).length;

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic title="Tổng số task" value={totalTasks} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Hoàn thành" value={completedTasks} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Quá hạn" value={overdueTasks} valueStyle={{ color: 'red' }} />
        </Card>
      </Col>
    </Row>
  );
};