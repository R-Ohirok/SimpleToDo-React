import axios from 'axios';
import type { TodosParams, TodosResponse, ToDoType } from '../types';
import api from './config';

export async function getTodos(params?: TodosParams): Promise<TodosResponse> {
  try {
    const response = await api.get<TodosResponse>('/todos', { params });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
  }
}

export async function addTodo(newTodo: ToDoType): Promise<ToDoType[]> {
  try {
    const response = await api.post('/todos', newTodo);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
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

export async function updateTodo(todoToUpdate: ToDoType): Promise<ToDoType> {
  const { id, title, isCompleted } = todoToUpdate;

  try {
    const response = await api.patch<ToDoType>(`/todos/${id}`, {
      title,
      isCompleted,
    });

    return response.data;
  } catch (error) {
    console.error('Failed to update ToDo: ', error);
    throw error;
  }
}
