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

export async function addTodo(newTodo: ToDoType): Promise<ToDoType[]> {
  try {
    const response = await instance.post('/todos', newTodo);

    return response.data;
  } catch (error) {
    console.error('Failed to create ToDo: ', error);
    throw error;
  }
}

export async function deleteTodo(idToDelete: string): Promise<ToDoType[]> {
  try {
    const response = await instance.delete(`/todos/${idToDelete}`);

    return response.data;
  } catch (error) {
    console.error('Failed to delete ToDo: ', error);
    throw error;
  }
}
