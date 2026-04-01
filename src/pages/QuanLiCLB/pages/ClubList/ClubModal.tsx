import { Modal, Form, Input, DatePicker, Switch } from 'antd';
import type { FormInstance } from 'antd';

interface Props {
    open: boolean;
    editing: boolean;
    form: FormInstance;
    onOk: () => void;
    onCancel: () => void;
}

export default function ClubModal({ open, editing, form, onOk, onCancel }: Props) {
    return (
        <Modal
            title={editing ? 'Chỉnh sửa CLB' : 'Thêm CLB mới'}
            visible={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Tên câu lạc bộ" rules={[{ required: true, message: 'Nhập tên CLB' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="foundedDate" label="Ngày thành lập" rules={[{ required: true, message: 'Chọn ngày' }]}>
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item name="description" label="Mô tả">
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item name="president" label="Chủ nhiệm CLB" rules={[{ required: true, message: 'Nhập tên chủ nhiệm' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="avatar" label="URL ảnh đại diện">
                    <Input placeholder="" />
                </Form.Item>
                <Form.Item name="active" label="Hoạt động" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    );
}