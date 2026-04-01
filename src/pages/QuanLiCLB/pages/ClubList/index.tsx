import { useState } from 'react';
import { Card, Table, Button, Space, Popconfirm, Tag, Avatar, Input } from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    TeamOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Club } from '../../types';
import { useClubList } from './useClubList';
import ClubModal from './ClubModal';

interface Props {
    onViewMembers: (clubId: string) => void;
}

export default function ClubListPage({ onViewMembers }: Props) {
    const { clubs, modalOpen, setModalOpen, editing, form, openAdd, openEdit, handleOk, handleDelete } =
        useClubList();
    const [search, setSearch] = useState('');

    const filtered = clubs.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
    );

    const columns: ColumnsType<Club> = [
        {
            title: 'Ảnh',
            width: 60,
            align: 'center',
            render: (_, r) => <Avatar src={r.avatar} icon={<TeamOutlined />} />,
        },
        {
            title: 'Tên CLB',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Ngày thành lập',
            dataIndex: 'foundedDate',
            width: 140,
            align: 'center',
            sorter: (a, b) => a.foundedDate.localeCompare(b.foundedDate),
            render: (v: string) => (v ? dayjs(v).format('DD/MM/YYYY') : ''),
        },
        {
            title: 'Chủ nhiệm',
            dataIndex: 'president',
            width: 160,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            ellipsis: true,
        },
        {
            title: 'Hoạt động',
            dataIndex: 'active',
            width: 100,
            align: 'center',
            render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? 'Có' : 'Không'}</Tag>,
        },
        {
            title: 'Thao tác',
            width: 150,
            align: 'center',
            render: (_, r) => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(r)} />
                    <Popconfirm
                        title="Xác nhận xóa CLB này?"
                        onConfirm={() => handleDelete(r.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                    <Button type="text" icon={<TeamOutlined />} onClick={() => onViewMembers(r.id)} />
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Quản lý Câu lạc bộ"
            extra={
                <Space>
                    <Input
                        placeholder="Tìm kiếm..."
                        prefix={<SearchOutlined />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        allowClear
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
                        Thêm CLB
                    </Button>
                </Space>
            }
        >
            <Table dataSource={filtered} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
            <ClubModal
                open={modalOpen}
                editing={!!editing}
                form={form}
                onOk={handleOk}
                onCancel={() => setModalOpen(false)}
            />
        </Card>
    );
}