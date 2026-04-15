import React, { useMemo, useState } from 'react';
import { Table, Button, Input, Select, Modal, message, Space, Empty } from 'antd';
import { useClassroomManager } from './hooks/useClassroomManager';
import ClassroomModal from './components/ClassroomModal';
import { filterClassrooms } from './utils/filters';
import { ROOM_TYPES, MANAGERS, DELETE_CAPACITY_LIMIT } from './constants';
import { Classroom } from './types';


const QuanLyPhongHoc: React.FC = () => {
  const { classrooms, addRoom, updateRoom, deleteRoom } = useClassroomManager();

  const [search, setSearch] = useState('');
  const [type, setType] = useState<string>();
  const [manager, setManager] = useState<string>();
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<Classroom | null>(null);

  const data = useMemo(
    () => filterClassrooms(classrooms, search, type, manager),
    [classrooms, search, type, manager]
  );

  const handleDelete = (room: Classroom) => {
    if (room.capacity >= DELETE_CAPACITY_LIMIT) {
      Modal.error({
        title: 'Không thể xóa',
        content: 'Chỉ được xóa phòng dưới 30 chỗ',
      });
      return;
    }

    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Xóa phòng ${room.name}?`,
      onOk: () => {
        deleteRoom(room.id);
        message.success('Đã xóa');
      },
    });
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm..."
          allowClear

          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />

        <Select 
          allowClear 
          placeholder="Loại phòng" 
          onChange={setType}
          options={ROOM_TYPES.map((t: string) => ({ label: t, value: t }))}
        />

        <Select 
          allowClear 
          placeholder="Người phụ trách" 
          onChange={setManager}
          options={MANAGERS.map((m: string) => ({ label: m, value: m }))}
        />

        <Button type="primary" onClick={() => setVisible(true)}>
          Thêm phòng
        </Button>
      </Space>

      <Table
        rowKey="id"
        dataSource={data}
        locale={{
          emptyText: (
            <Empty description="Chưa có dữ liệu">
              <Button type="primary" onClick={() => setVisible(true)}>
                Thêm phòng
              </Button>
            </Empty>
          ),
        }}
        columns={[
          { title: 'Mã', dataIndex: 'id' },
          { title: 'Tên', dataIndex: 'name' },
          {
            title: 'Số chỗ',
            dataIndex: 'capacity',
            sorter: (a: Classroom, b: Classroom) => a.capacity - b.capacity,
          },
          { title: 'Loại', dataIndex: 'type' },
          { title: 'Phụ trách', dataIndex: 'manager' },
          {
            title: 'Hành động',

            render: (_: any, record: Classroom) => (
              <Space>
                <Button
                  onClick={() => {
                    setEditing(record);
                    setVisible(true);
                  }}
                >
                  Sửa
                </Button>
                <Button danger onClick={() => handleDelete(record)}>
                  Xóa
                </Button>
              </Space>
            ),
          },
        ]}
      />

      <ClassroomModal
        visible={visible}
        editingRoom={editing}
        existingRooms={classrooms}
        onCancel={() => {
          setVisible(false);
          setEditing(null);
        }}
        // Khai báo rõ kiểu dữ liệu trả về từ modal là Classroom
        onSave={(room: Classroom) => {
          editing ? updateRoom(room) : addRoom(room);
          setVisible(false);
          setEditing(null);
        }}
      />
    </>
  );
};

export default QuanLyPhongHoc;