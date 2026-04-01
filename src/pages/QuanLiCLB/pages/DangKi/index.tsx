import { useState } from 'react';
import { Card, Table, Button, Space, Popconfirm, Tag, Input, Modal, Descriptions } from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    HistoryOutlined,
    EyeOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Registration, Club } from '../../types';
import { load, KEYS } from '../../data';
import { useRegistration } from './useRegistration';
import RegModal from './RegModal';
import HistoryModal from './HistoryModal';

export default function RegistrationPage() {
    const hook = useRegistration();
    const clubs = load<Club[]>(KEYS.CLUBS, []);
    const [search, setSearch] = useState('');

    const filtered = hook.registrations.filter(
        (r) =>
            r.fullName.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase()),
    );

    const getClubName = (id: string) => clubs.find((c) => c.id === id)?.name || '';

    const statusColor = (s: string) =>
        s === 'Approved' ? 'green' : s === 'Rejected' ? 'red' : 'gold';

    const viewing = hook.modal.type === 'detail' ? hook.modal.record : null;

    const columns: ColumnsType<Registration> = [
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 180,
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            width: 120,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            width: 90,
            align: 'center',
        },
        {
            title: 'CLB',
            dataIndex: 'clubId',
            width: 150,
            render: (id: string) => getClubName(id),
            filters: clubs.map((c) => ({ text: c.name, value: c.id })),
            onFilter: (v, r) => r.clubId === v,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 110,
            align: 'center',
            render: (s: string) => <Tag color={statusColor(s)}>{s}</Tag>,
            filters: [
                { text: 'Pending', value: 'Pending' },
                { text: 'Approved', value: 'Approved' },
                { text: 'Rejected', value: 'Rejected' },
            ],
            onFilter: (v, r) => r.status === v,
        },
        {
            title: 'Thao tác',
            width: 220,
            align: 'center',
            render: (_, r) => (
                <Space>
                    <Button type="text" icon={<EyeOutlined />} onClick={() => hook.setModal({ type: 'detail', record: r })} />
                    <Button type="text" icon={<EditOutlined />} onClick={() => hook.openEdit(r)} />
                    <Popconfirm
                        title="Xác nhận xóa?"
                        onConfirm={() => hook.handleDelete(r.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                    {r.status === 'Pending' && (
                        <>
                            <Button
                                type="text"
                                style={{ color: '#52c41a' }}
                                icon={<CheckOutlined />}
                                onClick={() => hook.approve([r.id])}
                            />
                            <Button
                                type="text"
                                danger
                                icon={<CloseOutlined />}
                                onClick={() => hook.openReject([r.id])}
                            />
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Quản lý đơn đăng ký"
            extra={
                <Space>
                    <Input
                        placeholder="Tìm kiếm..."
                        prefix={<SearchOutlined />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        allowClear
                    />
                    <Button icon={<HistoryOutlined />} onClick={() => hook.setModal({ type: 'history' })}>
                        Lịch sử
                    </Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={hook.openAdd}>
                        Thêm đơn
                    </Button>
                </Space>
            }
        >
            {hook.selectedRowKeys.length > 0 && (
                <Space style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={() => hook.approve(hook.selectedRowKeys as string[])}
                    >
                        Duyệt {hook.selectedRowKeys.length} đơn đã chọn
                    </Button>
                    <Button
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => hook.openReject(hook.selectedRowKeys as string[])}
                    >
                        Từ chối {hook.selectedRowKeys.length} đơn đã chọn
                    </Button>
                </Space>
            )}

            <Table
                dataSource={filtered}
                columns={columns}
                rowKey="id"
                rowSelection={{
                    selectedRowKeys: hook.selectedRowKeys,
                    onChange: hook.setSelectedRowKeys,
                    getCheckboxProps: (r) => ({ disabled: r.status !== 'Pending' }),
                }}
                pagination={{ pageSize: 10 }}
            />

            <RegModal
                open={hook.modal.type === 'add' || hook.modal.type === 'edit'}
                editing={hook.modal.type === 'edit'}
                form={hook.form}
                clubs={clubs}
                onOk={hook.handleOk}
                onCancel={hook.closeModal}
            />

            <Modal
                title="Chi tiết đơn đăng ký"
                visible={hook.modal.type === 'detail'}
                onCancel={hook.closeModal}
                footer={null}
                width={600}
            >
                {viewing && (
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="Họ tên">{viewing.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Email">{viewing.email}</Descriptions.Item>
                        <Descriptions.Item label="SĐT">{viewing.phone}</Descriptions.Item>
                        <Descriptions.Item label="Giới tính">{viewing.gender}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{viewing.address}</Descriptions.Item>
                        <Descriptions.Item label="Sở trường">{viewing.specialty}</Descriptions.Item>
                        <Descriptions.Item label="CLB">{getClubName(viewing.clubId)}</Descriptions.Item>
                        <Descriptions.Item label="Lý do đăng ký">{viewing.reason}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag color={statusColor(viewing.status)}>{viewing.status}</Tag>
                        </Descriptions.Item>
                        {viewing.rejectNote && (
                            <Descriptions.Item label="Lý do từ chối">{viewing.rejectNote}</Descriptions.Item>
                        )}
                    </Descriptions>
                )}
            </Modal>

            <Modal
                title="Từ chối đơn đăng ký"
                visible={hook.modal.type === 'reject'}
                onOk={hook.confirmReject}
                onCancel={hook.closeModal}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <Input.TextArea
                    rows={3}
                    value={hook.rejectNote}
                    onChange={(e) => hook.setRejectNote(e.target.value)}
                    placeholder="Nhập lý do từ chối (bắt buộc)..."
                />
            </Modal>

            <HistoryModal
                open={hook.modal.type === 'history'}
                history={hook.history}
                registrations={hook.registrations}
                onClose={hook.closeModal}
            />
        </Card>
    );
}