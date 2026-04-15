import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import { ROOM_TYPES, MANAGERS } from '../constants';
import { Classroom } from '../types';
import { checkUnique } from '../utils/validators';

interface Props {
  visible: boolean;
  editingRoom: Classroom | null;
  existingRooms: Classroom[];
  onCancel: () => void;
  onSave: (room: Classroom) => void;
}

type FormValues = {
  id: string;
  name: string;
  capacity: number;
  type: string;
  manager: string;
};

export default function ClassroomModal(props: Props) {
  const { visible, editingRoom, existingRooms, onCancel, onSave } = props;

  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    if (visible) {
      if (editingRoom) {
        form.setFieldsValue(editingRoom);
      } else {
        form.resetFields();
      }
    }
  }, [visible, editingRoom, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    const data: Classroom = {
      ...values,
      id: values.id.trim(),
      name: values.name.trim(),
    };

    onSave(data);
  };

  return (
    <Modal
      visible={visible} 
      title={editingRoom ? 'Chỉnh sửa phòng' : 'Thêm phòng'}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Lưu"
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={form} layout="vertical">

        <Form.Item
          name="id"
          label="Mã phòng"
          rules={[
            { required: true, message: 'Nhập mã phòng' },
            { max: 10, message: 'Tối đa 10 ký tự' },
            {
              validator: (_: any, value: string) =>
                checkUnique('id', value, existingRooms, editingRoom?.id),
            },
          ]}
        >
          <Input disabled={!!editingRoom} />
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên phòng"
          rules={[
            { required: true, message: 'Nhập tên phòng' },
            { max: 50, message: 'Tối đa 50 ký tự' },
            {
              validator: (_: any, value: string) =>
                checkUnique('name', value, existingRooms, editingRoom?.id),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="capacity"
          label="Số chỗ"
          rules={[{ required: true, message: 'Vui lòng nhập số chỗ' }]}
        >
          <InputNumber min={10} max={200} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="type"
          label="Loại phòng"
          rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
        >
          <Select 
            placeholder="Chọn loại phòng"
            options={ROOM_TYPES.map((t: string) => ({ label: t, value: t }))}
          />
        </Form.Item>

        <Form.Item
          name="manager"
          label="Người phụ trách"
          rules={[{ required: true, message: 'Vui lòng chọn người phụ trách' }]}
        >
          <Select 
            placeholder="Chọn người phụ trách"
            options={MANAGERS.map((m: string) => ({ label: m, value: m }))}
          />
        </Form.Item>

      </Form>
    </Modal>
  );
}