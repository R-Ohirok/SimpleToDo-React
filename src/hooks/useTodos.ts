import { useCallback, useEffect, useState } from 'react';
import type { ToDoType } from '../types';

type useTodosType = {
  todos: ToDoType[];
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
  isLoading: boolean;
};

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

const useTodos = (): useTodosType => {
  const [todos, setNewTodos] = useState<ToDoType[]>(getInitialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const setTodos = useCallback((value: React.SetStateAction<ToDoType[]>) => {
    setNewTodos(value);
  }, []);

  return { todos, setTodos, isLoading };
};

export default useTodos;
