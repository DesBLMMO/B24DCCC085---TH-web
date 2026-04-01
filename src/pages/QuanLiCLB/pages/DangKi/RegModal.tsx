import { Modal, Form, Input, Select, Radio } from 'antd';
import type { FormInstance } from 'antd';
import { Club } from '../../types';

interface Props {
    open: boolean;
    editing: boolean;
    form: FormInstance;
    clubs: Club[];
    onOk: () => void;
    onCancel: () => void;
}

export default function RegModal({ open, editing, form, clubs, onOk, onCancel }: Props) {
    return (
        <Modal
            title={editing ? 'Chỉnh sửa đơn' : 'Thêm đơn đăng ký'}
            visible={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="Lưu"
            cancelText="Hủy"
            width={600}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="fullName" label="Họ tên" rules={[{ required: true, message: 'Nhập họ tên' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Nhập email' },
                        { type: 'email', message: 'Email không hợp lệ' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Nhập SĐT' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="gender" label="Giới tính">
                    <Radio.Group>
                        <Radio value="Nam">Nam</Radio>
                        <Radio value="Nữ">Nữ</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ">
                    <Input />
                </Form.Item>
                <Form.Item name="specialty" label="Sở trường">
                    <Input />
                </Form.Item>
                <Form.Item name="clubId" label="Câu lạc bộ" rules={[{ required: true, message: 'Chọn CLB' }]}>
                    <Select
                        placeholder="Chọn CLB"
                        options={clubs.map((c) => ({ value: c.id, label: c.name }))}
                    />
                </Form.Item>
                <Form.Item name="reason" label="Lý do đăng ký">
                    <Input.TextArea rows={2} />
                </Form.Item>
            </Form>
        </Modal>
    );
}