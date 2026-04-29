import React from 'react';
import { Card, Row, Col, Statistic, Progress, Timeline } from 'antd';

const Dashboard: React.FC = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card><Statistic title="Buổi tập tháng" value={18} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Calo đốt" value={5400} suffix="kcal" /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Streak" value={7} suffix="ngày" /></Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Mục tiêu" value={75} suffix="%" />
            <Progress percent={75} />
          </Card>
        </Col>
      </Row>

      <Card title="5 buổi tập gần nhất" style={{ marginTop: 24 }}>
        <Timeline>
          <Timeline.Item>20/04 - Cardio - 45 phút</Timeline.Item>
          <Timeline.Item>19/04 - Yoga - 30 phút</Timeline.Item>
          <Timeline.Item>18/04 - HIIT - 20 phút</Timeline.Item>
        </Timeline>
      </Card>
    </>
  );
};

export default Dashboard;