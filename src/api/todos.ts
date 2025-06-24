import type { ToDoType } from '../types';

export async function fetchTodos(): Promise<ToDoType[]> {
  const response = await fetch('http://localhost:3000/todos');

  if (!response.ok) {
    throw new Error(`Failed to download ToDos: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}