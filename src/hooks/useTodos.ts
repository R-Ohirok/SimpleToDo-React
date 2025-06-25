import { useCallback, useEffect, useState } from 'react';
import { getTodos } from '../api/todos';
import type { ToDoType } from '../types';

type useTodosType = {
  todos: ToDoType[];
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
  isLoading: boolean;
};

const useTodos = (): useTodosType => {
  const [todos, setNewTodos] = useState<ToDoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getTodos();

        setNewTodos(data as ToDoType[]);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const setTodos = useCallback((value: React.SetStateAction<ToDoType[]>) => {
    setNewTodos(value);
  }, []);

  return { todos, setTodos, isLoading };
};

export default useTodos;
