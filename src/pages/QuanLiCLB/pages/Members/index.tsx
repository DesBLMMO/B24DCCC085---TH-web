import { Card, Table, Select, Button, Space, Modal, Typography } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Registration } from '../../types';
import { useMembers } from './useMembers';

interface Props {
    initialClubId?: string;
}

export default function MembersPage({ initialClubId }: Props) {
    const {
        members,
        clubs,
        selectedClubId,
        setSelectedClubId,
        selectedRowKeys,
        setSelectedRowKeys,
        transferOpen,
        setTransferOpen,
        targetClubId,
        setTargetClubId,
        transferMembers,
    } = useMembers(initialClubId);

    const getClubName = (id: string) => clubs.find((c) => c.id === id)?.name || '';

    const columns: ColumnsType<Registration> = [
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        },
        { title: 'Email', dataIndex: 'email' },
        { title: 'SĐT', dataIndex: 'phone', width: 120 },
        { title: 'Giới tính', dataIndex: 'gender', width: 90, align: 'center' },
        { title: 'Địa chỉ', dataIndex: 'address', ellipsis: true },
        { title: 'Sở trường', dataIndex: 'specialty' },
        { title: 'CLB', dataIndex: 'clubId', render: (id: string) => getClubName(id) },
    ];

    return (
        <Card
            title="Quản lý thành viên"
            extra={
                <Space>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Lọc theo CLB"
                        allowClear
                        value={selectedClubId}
                        onChange={setSelectedClubId}
                        options={clubs.map((c) => ({ value: c.id, label: c.name }))}
                    />
                    {selectedRowKeys.length > 0 && (
                        <Button
                            type="primary"
                            icon={<SwapOutlined />}
                            onClick={() => setTransferOpen(true)}
                        >
                            Chuyển CLB ({selectedRowKeys.length})
                        </Button>
                    )}
                </Space>
            }
        >
            <Table
                dataSource={members}
                columns={columns}
                rowKey="id"
                rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title="Chuyển câu lạc bộ"
                visible={transferOpen}
                onOk={transferMembers}
                onCancel={() => setTransferOpen(false)}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <Typography.Paragraph>
                    Chuyển {selectedRowKeys.length} thành viên sang CLB mới:
                </Typography.Paragraph>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Chọn CLB đích"
                    value={targetClubId}
                    onChange={setTargetClubId}
                    options={clubs.map((c) => ({ value: c.id, label: c.name }))}
                />
            </Modal>
        </Card>
    );
}