import { Classroom } from '../types';

export const checkUnique = (
  field: 'id' | 'name',
  value: string,
  list: Classroom[],
  editingId?: string
): Promise<void> => {
  if (!value) return Promise.resolve();

  const isDuplicate = list.some(
    (item) =>
      item[field].toLowerCase() === value.trim().toLowerCase() &&
      item.id !== editingId
  );

  if (isDuplicate) {
    return Promise.reject(
      new Error(field === 'id' ? 'Mã phòng đã tồn tại!' : 'Tên phòng đã tồn tại!')
    );
  }

  return Promise.resolve();
};