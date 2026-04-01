import { Modal, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { ActionHistory, Registration } from '../../types';

interface Props {
    open: boolean;
    history: ActionHistory[];
    registrations: Registration[];
    onClose: () => void;
}

export default function HistoryModal({ open, history, registrations, onClose }: Props) {
    const columns = [
        {
            title: 'Đơn đăng ký',
            dataIndex: 'registrationId',
            render: (id: string) => registrations.find((r) => r.id === id)?.fullName || id,
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (a: string) => (
                <Tag color={a === 'Approved' ? 'green' : 'red'}>{a}</Tag>
            ),
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            ellipsis: true,
        },
        {
            title: 'Thời gian',
            dataIndex: 'timestamp',
            render: (t: string) => dayjs(t).format('HH:mm DD/MM/YYYY'),
        },
    ];

    return (
        <Modal
            title="Lịch sử thao tác"
            visible={open}
            onCancel={onClose}
            footer={null}
            width={700}
        >
            <Table
                dataSource={[...history].reverse()}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </Modal>
    );
}