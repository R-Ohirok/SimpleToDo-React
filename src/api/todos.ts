import axios from 'axios';
import type { ToDoType } from '../types';

export async function getTodos(): Promise<ToDoType[]> {
  try {
    const response = await axios.get<ToDoType[]>('http://localhost:3000/todos');

    return response.data;
  } catch (error) {
    console.error('Failed to download ToDos: ', error);
    throw error;
  }
}
