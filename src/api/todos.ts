import type { ToDoType } from '../types';
import instance from './config';

export async function getTodos(): Promise<ToDoType[]> {
  try {
    const response = await instance.get<ToDoType[]>('/todos');

    return response.data;
  } catch (error) {
    console.error('Failed to download ToDos: ', error);
    throw error;
  }
}
