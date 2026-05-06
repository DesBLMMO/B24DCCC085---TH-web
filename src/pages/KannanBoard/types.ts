export interface Task {
  id: string;
  name: string;
  description: string;
  deadline: string;
  priority: 'Cao' | 'Trung bình' | 'Thấp';
  tag: string;
  status: 'todo' | 'inprogress' | 'done';
}