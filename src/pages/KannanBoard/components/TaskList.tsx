import React from 'react';
import { Table, Tag, Space, Input, Select, Button } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const [searchText, setSearchText] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<string>('all');

  const filteredTasks = tasks.filter(task => {
    const matchSearch = task.name.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const columns: any[] = [
    { title: 'Tên task', dataIndex: 'name', key: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    { title: 'Deadline', dataIndex: 'deadline', key: 'deadline', sorter: (a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime() },
    {
      title: 'Ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      filters: [
        { text: 'Cao', value: 'Cao' },
        { text: 'Trung bình', value: 'Trung bình' },
        { text: 'Thấp', value: 'Thấp' },
      ],
      onFilter: (value: any, record: any) => record.priority === value,
    },
    { title: 'Tag', dataIndex: 'tag', key: 'tag' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Cần làm', value: 'todo' },
        { text: 'Đang làm', value: 'inprogress' },
        { text: 'Hoàn thành', value: 'done' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: string) => {
        const colors: any = { todo: 'orange', inprogress: 'blue', done: 'green' };
        const labels: any = { todo: 'Cần làm', inprogress: 'Đang làm', done: 'Hoàn thành' };
        return <Tag color={colors[status]}>{labels[status]}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Task) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select value={filterStatus} onChange={setFilterStatus} style={{ width: 150 }}>
          <Select.Option value="all">Tất cả</Select.Option>
          <Select.Option value="todo">Cần làm</Select.Option>
          <Select.Option value="inprogress">Đang làm</Select.Option>
          <Select.Option value="done">Hoàn thành</Select.Option>
        </Select>
      </Space>
      <Table columns={columns} dataSource={filteredTasks} rowKey="id" pagination={{ pageSize: 10 }} />
    </div>
  );
};