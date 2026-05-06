import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { Button, Space, Tag } from 'antd';
import { Task } from '../types';

interface KanbanBoardProps {
  tasks: Task[];
  onDragEnd: (result: DropResult) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusLabels: Record<Task['status'], string> = {
  todo: 'Cần làm',
  inprogress: 'Đang làm',
  done: 'Hoàn thành',
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onDragEnd, onEdit, onDelete }) => {
  const getTasksByStatus = (status: Task['status']) => tasks.filter(t => t.status === status);

  const renderColumn = (status: Task['status']) => (
    <Droppable droppableId={status}>
      {(provided: DroppableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ flex: 1, margin: '0 8px', padding: '8px', background: '#f5f5f5', minHeight: '800px' }}
        >
          <h3>{statusLabels[status]} ({getTasksByStatus(status).length})</h3>
          {getTasksByStatus(status).map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided: DraggableProvided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    padding: '8px',
                    margin: '0 0 8px 0',
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    ...provided.draggableProps.style,
                  }}
                >
                  <strong>{task.name}</strong>
                  <div style={{ fontSize: '12px', color: '#666' }}>{task.description}</div>
                  <div style={{ marginTop: '4px', marginBottom: '4px' }}>
                    <Tag>{task.priority}</Tag>
                    <Tag>{task.tag}</Tag>
                  </div>
                  <Space style={{ marginTop: '4px' }}>
                    <Button size="small" onClick={() => onEdit(task)}>Sửa</Button>
                    <Button size="small" onClick={() => onDelete(task.id)}>Xóa</Button>
                  </Space>
                  <div>
                    <span style={{ fontSize: '12px' }}>Deadline: {task.deadline}</span>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        {renderColumn('todo')}
        {renderColumn('inprogress')}
        {renderColumn('done')}
      </div>
    </DragDropContext>
  );
};