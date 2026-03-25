import React, { useState } from 'react';
import { Form, Input, Button, Table, message, Card, DatePicker } from 'antd';
import { Diploma, Decision } from '../types';

interface Props {
  diplomas: Diploma[];
  decisions: Decision[];
  setDecisions: React.Dispatch<React.SetStateAction<Decision[]>>;
}

const TraCuuVanBang: React.FC<Props> = ({ diplomas, decisions, setDecisions }) => {
  const [form] = Form.useForm();
  const [results, setResults] = useState<Diploma[]>([]);

  const onFinish = (values: any) => {
    
    const activeParams = Object.keys(values).filter(key => values[key] !== undefined && values[key] !== null && values[key] !== '');

    if (activeParams.length < 2) {
      message.error('Yêu cầu nhập ít nhất 2 tham số để tra cứu!');
      return;
    }

   
    const searchDob = values.dob ? values.dob.format('DD/MM/YYYY') : undefined;

    const filtered = diplomas.filter(dip => {
      let isMatch = true;
      if (values.soHieu && dip.soHieu !== values.soHieu) isMatch = false;
      if (values.soVaoSo && dip.soVaoSo.toString() !== values.soVaoSo) isMatch = false;
      if (values.studentId && dip.studentId !== values.studentId) isMatch = false;
      
      if (values.fullName && !dip.fullName.toLowerCase().includes(values.fullName.toLowerCase())) isMatch = false;
      
      if (searchDob && dip.dob !== searchDob) isMatch = false;
      
      return isMatch;
    });

    setResults(filtered);

    if (filtered.length > 0) {
      const viewedDecisions = new Set(filtered.map(d => d.decisionId));
      setDecisions(prev => prev.map(d => 
        viewedDecisions.has(d.id) ? { ...d, viewCount: d.viewCount + 1 } : d
      ));
      message.success(`Tra cứu thành công! Tìm thấy ${filtered.length} kết quả.`);
    } else {
      message.info('Không tìm thấy văn bằng nào khớp với thông tin.');
    }
  };

  const columns = [
    { title: 'Số vào sổ', dataIndex: 'soVaoSo' },
    { title: 'Số hiệu', dataIndex: 'soHieu' },
    { title: 'Họ tên', dataIndex: 'fullName' },
    { title: 'MSV', dataIndex: 'studentId' },
    { title: 'Ngày sinh', dataIndex: 'dob' },
    {
      title: 'Thuộc Quyết định',
      key: 'decision',
      render: (_: any, record: Diploma) => {
        const dec = decisions.find(d => d.id === record.decisionId);
        return dec ? dec.decisionNumber : '';
      },
    },
  ];

  return (
    <div style={{ padding: '0 20px' }}>
      <Card title="Tra Cứu Thông Tin Văn Bằng" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Form form={form} layout="inline" onFinish={onFinish}>
          <Form.Item name="soHieu" label="Số hiệu">
            <Input placeholder="Nhập số hiệu..." />
          </Form.Item>
          <Form.Item name="soVaoSo" label="Số vào sổ">
            <Input placeholder="Nhập số vào sổ..." />
          </Form.Item>
          <Form.Item name="studentId" label="Mã SV">
            <Input placeholder="Nhập MSV..." />
          </Form.Item>
          <Form.Item name="fullName" label="Họ tên">
            <Input placeholder="Nhập một phần họ tên..." />
          </Form.Item>
          <Form.Item name="dob" label="Ngày sinh">
            <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Tra cứu hệ thống</Button>
          </Form.Item>
        </Form>
      </Card>

      {results.length > 0 && (
        <Card style={{ marginTop: 20 }} bordered={false}>
          <Table dataSource={results} rowKey="id" columns={columns} bordered />
        </Card>
      )}
    </div>
  );
};

export default TraCuuVanBang;