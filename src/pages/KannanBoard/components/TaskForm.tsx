import React from 'react';
import { Modal, Form, Input, Select, DatePicker, FormInstance } from 'antd';
import { Task } from '../types';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

interface TaskFormProps {
  visible: boolean;
  editingTask: Task | null;
  form: FormInstance;
  onOk: (values: any) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ visible, editingTask, form, onOk, onCancel }) => {
  React.useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({ ...editingTask, deadline: moment(editingTask.deadline) });
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

  return (
    <Modal
      title={editingTask ? 'Chỉnh sửa task' : 'Thêm task'}
      visible={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" onFinish={onOk}>
        <Form.Item name="name" label="Tên task" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="priority" label="Mức độ ưu tiên" rules={[{ required: true }]}>
          <Select>
            <Option value="Cao">Cao</Option>
            <Option value="Trung bình">Trung bình</Option>
            <Option value="Thấp">Thấp</Option>
          </Select>
        </Form.Item>
        <Form.Item name="tag" label="Tag">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};