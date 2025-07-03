import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import type { FilterStatusType, TodosParams, ToDoType } from '../types';
import { BASE_URL, FIRST_PAGE, ITEMS_PER_PAGE } from '../constants/constants';
import { useSearchParams } from 'react-router-dom';
import isMatchParams from '../utils/isMatchParams';
import { snakeToCamel } from '../utils/snakeToCamel';

export const useTodoSocket = () => {
  const [searchParams] = useSearchParams();
  
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const socket = io(BASE_URL);

    const status = searchParams.get('status') as FilterStatusType;
    const title = searchParams.get('title') || '';
    const activePage = Number(searchParams.get('page') || FIRST_PAGE);
  
    const PARAMS: TodosParams = {
      status,
      title,
      limit: ITEMS_PER_PAGE,
      offset: (activePage - 1) * ITEMS_PER_PAGE,
    };

    const handleUpdate = (updatedTodo: ToDoType) => {
      queryClient.setQueryData(['todos', PARAMS], (oldData: any) => {
        if (!oldData) return oldData;

        const isMatch = isMatchParams(updatedTodo, PARAMS);

        if (!isMatch) {
          return {
            ...oldData,
            todos: oldData.todos.filter(
              (todo: ToDoType) => todo.id !== updatedTodo.id,
            ),
          };
        }

        return {
          ...oldData,
          todos: oldData.todos.map((todo: ToDoType) =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        };
      });
    };

    const handleAdd = (newTodo: ToDoType) => {
      queryClient.setQueryData(['todos', PARAMS], (oldData: any) => {
        if (!oldData) return oldData;

        const isMatch = isMatchParams(newTodo, PARAMS);

        if (isMatch) {
          return {
            ...oldData,
            todos: [...oldData.todos, newTodo],
          };
        }

        return oldData;
      });
    };

    const handleDelete = (toDoId: string) => {
      queryClient.setQueryData(['todos', PARAMS], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          todos: oldData.todos.filter((todo: ToDoType) => todo.id !== toDoId),
        };
      });
    };

    const updateHandler = snakeToCamel(handleUpdate);
    const addHandler = snakeToCamel(handleAdd);

    socket.on('todo-updated', updateHandler);
    socket.on('todo-created', addHandler);
    socket.on('todo-deleted', handleDelete);

    return () => {
      socket.off('todo-updated', updateHandler);
      socket.off('todo-created', addHandler);
      socket.off('todo-deleted', handleDelete);
      socket.close();
    };
  }, [searchParams, queryClient]);
};
