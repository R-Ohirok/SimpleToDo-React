import { useCallback, useEffect, useState } from 'react';
import type { ToDoType } from '../types';

const getInitialValue = (defaultValue: ToDoType[]): ToDoType[] => {
  const data = localStorage.getItem('todos');

  if (data === null) {
    return defaultValue;
  }

  try {
    return JSON.parse(data);
  } catch {
    localStorage.removeItem('todos');
  }

  return defaultValue;
};

const useTodos = (
  defaultValue: ToDoType[],
): [
  ToDoType[],
  (value: ToDoType[] | ((prev: ToDoType[]) => ToDoType[])) => void,
] => {
  const [todos, setTodos] = useState<ToDoType[]>(getInitialValue(defaultValue));

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const updateTodos = useCallback(
    (value: ToDoType[] | ((prev: ToDoType[]) => ToDoType[])) => {
      setTodos(prev =>
        typeof value === 'function'
          ? (value as (prev: ToDoType[]) => ToDoType[])(prev)
          : value,
      );
    },
    [],
  );

  return [todos, updateTodos];
};

export default useTodos;
