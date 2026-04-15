import { Classroom } from '../types';

const KEY = 'classroom_data';

export const loadClassrooms = (): Classroom[] => {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveClassrooms = (data: Classroom[]): void => {
  localStorage.setItem(KEY, JSON.stringify(data));
};