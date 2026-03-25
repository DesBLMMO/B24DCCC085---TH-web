import React from 'react';
import { Form, Input, Button, Table, Select, DatePicker, message } from 'antd';
import { Decision, Registry } from '../types';
import { generateId } from '../utils/helpers';

interface Props {
  decisions: Decision[];
  setDecisions: React.Dispatch<React.SetStateAction<Decision[]>>;
  registries: Registry[];
}

const QuanLyQuyetDinh: React.FC<Props> = ({ decisions, setDecisions, registries }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newDecision: Decision = {
      id: generateId(),
      registryId: values.registryId,
      decisionNumber: values.decisionNumber,
      issueDate: values.issueDate.format('DD/MM/YYYY'),
      summary: values.summary || '',
      viewCount: 0, // Chuẩn bị sẵn cho chức năng tra cứu
    };
    
    setDecisions([...decisions, newDecision]);
    form.resetFields();
    message.success('Tạo quyết định tốt nghiệp thành công!');
  };

  const columns = [
    { title: 'Số QĐ', dataIndex: 'decisionNumber', key: 'decisionNumber' },
    { title: 'Ngày ban hành', dataIndex: 'issueDate', key: 'issueDate' },
    { title: 'Trích yếu', dataIndex: 'summary', key: 'summary' },
    { title: 'Lượt tra cứu', dataIndex: 'viewCount', key: 'viewCount' },
    {
      title: 'Thuộc sổ',
      key: 'registryName',
      render: (_: any, record: Decision) => {
        const reg = registries.find(r => r.id === record.registryId);
        return reg ? reg.name : <span style={{ color: 'red' }}>Lỗi: Không tìm thấy sổ</span>;
      },
    },
  ];

  return (
    <div>
      <Form form={form} layout="inline" onFinish={onFinish} style={{ marginBottom: 20 }}>
        <Form.Item name="registryId" rules={[{ required: true, message: 'Vui lòng chọn sổ' }]}>
          <Select placeholder="Chọn Sổ quản lý" style={{ width: 200 }}>
            {registries.map(r => (
              <Select.Option key={r.id} value={r.id}>{r.name} ({r.year})</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="decisionNumber" rules={[{ required: true, message: 'Vui lòng nhập số QĐ' }]}>
          <Input placeholder="Số Quyết định" />
        </Form.Item>
        <Form.Item name="issueDate" rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
          <DatePicker format="DD/MM/YYYY" placeholder="Ngày ban hành" />
        </Form.Item>
        <Form.Item name="summary">
          <Input placeholder="Trích yếu nội dung" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Tạo Quyết định</Button>
        </Form.Item>
      </Form>
      <Table dataSource={decisions} rowKey="id" columns={columns} bordered />
    </div>
  );
};

export default QuanLyQuyetDinh;