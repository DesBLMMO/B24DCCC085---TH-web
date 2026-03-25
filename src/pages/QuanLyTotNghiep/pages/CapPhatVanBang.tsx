import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber, Modal, Table, message } from 'antd';
import { Diploma, Decision, FieldConfig } from '../types';
import { generateId } from '../utils/helpers';

interface Props {
  diplomas: Diploma[];
  setDiplomas: React.Dispatch<React.SetStateAction<Diploma[]>>;
  decisions: Decision[];
  fieldConfigs: FieldConfig[];
}

const CapPhatVanBang: React.FC<Props> = ({ diplomas, setDiplomas, decisions, fieldConfigs }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDecisionChange = (decisionId: string) => {
    const decision = decisions.find(d => d.id === decisionId);
    if (decision) {
      const relatedDiplomas = diplomas.filter(dip => dip.registryId === decision.registryId);
      const currentMax = relatedDiplomas.reduce((max, dip) => Math.max(max, Number(dip.soVaoSo) || 0), 0);
      form.setFieldsValue({ soVaoSo: currentMax + 1 });
    }
  };

  const onFinish = (values: any) => {
    if (diplomas.some(dip => dip.soHieu === values.soHieu)) {
      return message.error(`Lỗi: Số hiệu văn bằng "${values.soHieu}" đã tồn tại!`);
    }
    if (diplomas.some(dip => dip.studentId === values.studentId)) {
      return message.error(`Lỗi: Sinh viên mã "${values.studentId}" đã được cấp bằng!`);
    }

    const decision = decisions.find(d => d.id === values.decisionId);
    if (!decision) return;

    const dynamicData: Record<string, any> = {};
    fieldConfigs.forEach(field => {
      let val = values[`dynamic_${field.id}`];
      if (field.type === 'date' && val) {
        val = val.format('DD/MM/YYYY');
      }
      dynamicData[field.id] = val;
    });

    const newDiploma: Diploma = {
      id: generateId(),
      decisionId: values.decisionId,
      registryId: decision.registryId,
      soVaoSo: values.soVaoSo,
      soHieu: values.soHieu,
      studentId: values.studentId,
      fullName: values.fullName,
      dob: values.dob.format('DD/MM/YYYY'),
      dynamicData,
    };

    setDiplomas([...diplomas, newDiploma]);
    message.success('Cấp phát văn bằng thành công!');
    setIsModalOpen(false);
    form.resetFields();
  };

  const renderDynamicField = (field: FieldConfig) => {
    switch (field.type) {
      case 'number': return <InputNumber style={{ width: '100%' }} />;
      case 'date': return <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />;
      default: return <Input />;
    }
  };

  const columns = [
    { title: 'Số vào sổ', dataIndex: 'soVaoSo', key: 'soVaoSo' },
    { title: 'Số hiệu', dataIndex: 'soHieu', key: 'soHieu' },
    { title: 'Mã SV', dataIndex: 'studentId', key: 'studentId' },
    { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Ngày sinh', dataIndex: 'dob', key: 'dob' },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 20 }}>
        + Cấp phát Văn bằng mới
      </Button>
      <Table dataSource={diplomas} columns={columns} rowKey="id" bordered />

      <Modal 
        title="Nhập thông tin Văn bằng" 
        visible={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="decisionId" label="Thuộc Quyết định" rules={[{ required: true, message: 'Vui lòng chọn quyết định' }]}>
            <Select onChange={handleDecisionChange} placeholder="-- Chọn quyết định tốt nghiệp --">
              {decisions.map(d => (
                <Select.Option key={d.id} value={d.id}>QĐ số: {d.decisionNumber} (Cấp ngày: {d.issueDate})</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Form.Item name="soVaoSo" label="Số vào sổ">
              <InputNumber disabled style={{ width: '100%', fontWeight: 'bold', color: 'red' }} />
            </Form.Item>
            <Form.Item name="soHieu" label="Số hiệu văn bằng" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="studentId" label="Mã sinh viên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fullName" label="Họ tên sinh viên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true }]}>
              <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
            </Form.Item>
          </div>
          {fieldConfigs.length > 0 && <div style={{ borderTop: '1px solid #eee', paddingTop: 16, marginTop: 8 }}>
            <p style={{ fontWeight: 'bold' }}>Thông tin phụ lục (Lấy từ cấu hình):</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              {fieldConfigs.map(field => (
                <Form.Item key={field.id} name={`dynamic_${field.id}`} label={field.name}>
                  {renderDynamicField(field)}
                </Form.Item>
              ))}
            </div>
          </div>}

          <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
            <Button onClick={() => setIsModalOpen(false)} style={{ marginRight: 8 }}>Hủy</Button>
            <Button type="primary" htmlType="submit">Lưu Văn Bằng</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CapPhatVanBang;