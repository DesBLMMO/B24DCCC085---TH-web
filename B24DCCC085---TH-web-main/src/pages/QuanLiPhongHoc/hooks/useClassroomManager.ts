import { useEffect, useState } from 'react';
import { Classroom } from '../types';
import { loadClassrooms, saveClassrooms } from '../services/classroomStorage';

export const useClassroomManager = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>(() =>
    loadClassrooms()
  );

  useEffect(() => {
    saveClassrooms(classrooms);
  }, [classrooms]);

  const addRoom = (room: Classroom): void => {
    setClassrooms((prev: Classroom[]) => [...prev, room]);
  };

  const updateRoom = (room: Classroom): void => {
    setClassrooms((prev: Classroom[]) =>
      prev.map((r) => (r.id === room.id ? room : r))
    );
  };

  const deleteRoom = (id: string): void => {
    setClassrooms((prev: Classroom[]) =>
      prev.filter((r) => r.id !== id)
    );
  };

  return {
    classrooms,
    addRoom,
    updateRoom,
    deleteRoom,
  };
};