import { useCallback, useEffect, useState } from 'react';
import type { ToDoType } from '../types';

const DEFAULT_VALUE: ToDoType[] = [];

const getInitialValue = (): ToDoType[] => {
  const data = localStorage.getItem('todos');

  if (data === null) {
    return DEFAULT_VALUE;
  }

  try {
    return JSON.parse(data);
  } catch {
    localStorage.removeItem('todos');
  }

  return DEFAULT_VALUE;
};

const useTodos = (): {
  todos: ToDoType[],
  updateTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>,
  isLoading: boolean,
} => {
  const [todos, setTodos] = useState<ToDoType[]>(getInitialValue());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const updateTodos = useCallback((value: React.SetStateAction<ToDoType[]>) => {
    setTodos(value);
  }, []);

  return {todos, updateTodos, isLoading};
};

export default useTodos;
