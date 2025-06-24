import { useCallback, useEffect, useState } from 'react';
import { fetchTodos } from '../api/todos';
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
    const fetchData = async () => {
      try {
        const data = await fetchTodos();

        setNewTodos(data as ToDoType[]);
      } catch (err) {
        console.error('Error fetching todos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const setTodos = useCallback((value: React.SetStateAction<ToDoType[]>) => {
    setNewTodos(value);
  }, []);


  return { todos, setTodos, isLoading };
};

export default useTodos;
