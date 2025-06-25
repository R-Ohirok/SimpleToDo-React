import type { ToDoType } from '../types';
import api from './config';

export async function getTodos(): Promise<ToDoType[]> {
  try {
    const response = await api.get<ToDoType[]>('/todos');

    return response.data;
  } catch (error) {
    console.error('Failed to download ToDos: ', error);
    throw error;
  }
}

export async function addTodo(newTodo: ToDoType): Promise<ToDoType[]> {
  try {
    const response = await api.post('/todos', newTodo);

    return response.data;
  } catch (error) {
    console.error('Failed to create ToDo: ', error);
    throw error;
  }
}

export async function deleteTodo(idToDelete: string): Promise<ToDoType[]> {
  try {
    const response = await api.delete(`/todos/${idToDelete}`);

    return response.data;
  } catch (error) {
    console.error('Failed to delete ToDo: ', error);
    throw error;
  }
}
