import React, { useState, useEffect } from 'react';
import { Form, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Task } from './types';
import { loadTasks, saveTasks } from './storage';
import { Dashboard } from './components/Dashboard';
import { KanbanBoard } from './components/KanbanBoard';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { DropResult } from 'react-beautiful-dnd';

type Page = 'dashboard' | 'kanban' | 'list';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState<Page>('dashboard');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  const handleAdd = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleSubmit = (values: any) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...values, deadline: values.deadline.format('YYYY-MM-DD') } : t));
    } else {
      const newTask: Task = { id: Date.now().toString(), ...values, deadline: values.deadline.format('YYYY-MM-DD'), status: 'todo' };
      setTasks([...tasks, newTask]);
    }
    setModalVisible(false);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceStatus = source.droppableId as Task['status'];
    const destinationStatus = destination.droppableId as Task['status'];
    const sourceTasks = tasks.filter((task) => task.status === sourceStatus);
    const movedTask = sourceTasks[source.index];
    if (!movedTask) return;

    setTasks((prevTasks) => {
      const columns: Record<Task['status'], Task[]> = {
        todo: prevTasks.filter((task) => task.status === 'todo'),
        inprogress: prevTasks.filter((task) => task.status === 'inprogress'),
        done: prevTasks.filter((task) => task.status === 'done'),
      };

      if (sourceStatus === destinationStatus) {
        const updated = Array.from(columns[sourceStatus]);
        const [removed] = updated.splice(source.index, 1);
        updated.splice(destination.index, 0, removed);
        columns[sourceStatus] = updated;
      } else {
        const sourceList = Array.from(columns[sourceStatus]);
        const [removed] = sourceList.splice(source.index, 1);
        const destinationList = Array.from(columns[destinationStatus]);
        destinationList.splice(destination.index, 0, { ...removed, status: destinationStatus });
        columns[sourceStatus] = sourceList;
        columns[destinationStatus] = destinationList;
      }

      return [...columns.todo, ...columns.inprogress, ...columns.done];
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Space style={{ marginBottom: '20px' }}>
        <Button onClick={() => setPage('dashboard')}>Dashboard</Button>
        <Button onClick={() => setPage('kanban')}>Kanban Board</Button>
        <Button onClick={() => setPage('list')}>Danh sách task</Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Thêm task</Button>
      </Space>

      {page === 'dashboard' && <Dashboard tasks={tasks} />}
      {page === 'kanban' && <KanbanBoard tasks={tasks} onDragEnd={onDragEnd} onEdit={handleEdit} onDelete={handleDelete} />}
      {page === 'list' && <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />}

      <TaskForm
        visible={modalVisible}
        editingTask={editingTask}
        form={form}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
};

export default App;