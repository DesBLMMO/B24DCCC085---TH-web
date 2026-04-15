import { Classroom } from '../types';

export const filterClassrooms = (
  data: Classroom[],
  search: string,
  type?: string,
  manager?: string
): Classroom[] => {
  return data.filter((room) => {
    const matchSearch =
      room.id.toLowerCase().includes(search.toLowerCase()) ||
      room.name.toLowerCase().includes(search.toLowerCase());

    return (
      matchSearch &&
      (!type || room.type === type) &&
      (!manager || room.manager === manager)
    );
  });
};