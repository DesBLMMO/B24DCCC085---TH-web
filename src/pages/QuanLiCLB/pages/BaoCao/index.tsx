import { Card, Row, Col, Statistic } from 'antd';
import {
    TeamOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { Club, Registration } from '../../types';
import { load, KEYS } from '../../data';

export default function ReportsPage() {
    const clubs = load<Club[]>(KEYS.CLUBS, []);
    const registrations = load<Registration[]>(KEYS.REGISTRATIONS, []);

    const pending = registrations.filter((r) => r.status === 'Pending').length;
    const approved = registrations.filter((r) => r.status === 'Approved').length;
    const rejected = registrations.filter((r) => r.status === 'Rejected').length;

    const chartOptions: ApexOptions = {
        chart: { type: 'bar' },
        xaxis: { categories: clubs.map((c) => c.name) },
        plotOptions: { bar: { columnWidth: '50%' } },
        dataLabels: { enabled: false },
        colors: ['#faad14', '#52c41a', '#f5222d'],
    };

    const series = [
        {
            name: 'Pending',
            data: clubs.map(
                (c) => registrations.filter((r) => r.clubId === c.id && r.status === 'Pending').length,
            ),
        },
        {
            name: 'Approved',
            data: clubs.map(
                (c) => registrations.filter((r) => r.clubId === c.id && r.status === 'Approved').length,
            ),
        },
        {
            name: 'Rejected',
            data: clubs.map(
                (c) => registrations.filter((r) => r.clubId === c.id && r.status === 'Rejected').length,
            ),
        },
    ];

    return (
        <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic title="Số CLB" value={clubs.length} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Pending"
                            value={pending}
                            prefix={<ClockCircleOutlined />}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Approved"
                            value={approved}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Rejected"
                            value={rejected}
                            prefix={<CloseCircleOutlined />}
                            valueStyle={{ color: '#f5222d' }}
                        />
                    </Card>
                </Col>
            </Row>
            <Card title="Số đơn đăng ký theo từng CLB">
                <Chart options={chartOptions} series={series} type="bar" height={400} />
            </Card>
        </>
    );
}