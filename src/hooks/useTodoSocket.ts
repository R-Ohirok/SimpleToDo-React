import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import type { FilterStatusType, TodosParams, ToDoType } from '../types';
import { BASE_URL, FIRST_PAGE, ITEMS_PER_PAGE } from '../constants/constants';
import { useSearchParams } from 'react-router-dom';
import isMatchParams from '../utils/isMatchParams';
import { snakeToCamel } from '../utils/snakeToCamel';

export const useTodoSocket = () => {
  const [searchParams] = useSearchParams();
  const socketRef = useRef<Socket | null>(null);

  const status = searchParams.get('status') as FilterStatusType;
  const title = searchParams.get('title') || '';
  const activePage = Number(searchParams.get('page') || FIRST_PAGE);

  const PARAMS: TodosParams = {
    status,
    title,
    limit: ITEMS_PER_PAGE,
    offset: (activePage - 1) * ITEMS_PER_PAGE,
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = (io(BASE_URL));
    socketRef.current = socket;
    
    return () => {
      socketRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) {
      return;
    }

    const handleUpdate = (updatedTodo: ToDoType) => {
      const isMatch = isMatchParams(updatedTodo, PARAMS);

      isMatch
        ? queryClient.setQueryData(['todos', PARAMS], (oldData: any) => {
            return {
              ...oldData,
              todos: oldData.todos.map((todo: ToDoType) =>
                todo.id === updatedTodo.id ? updatedTodo : todo,
              ),
            };
          })
        : queryClient.invalidateQueries({ queryKey: ['todos'] });
    };

    const handleAdd = () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    };

    const handleDelete = () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    };

    const updateHandler = snakeToCamel(handleUpdate);

    socket.on('todo-updated', updateHandler);
    socket.on('todo-created', handleAdd);
    socket.on('todo-deleted', handleDelete);

    return () => {
      socket.off('todo-updated', updateHandler);
      socket.off('todo-created', handleAdd);
      socket.off('todo-deleted', handleDelete);
    };
  }, [queryClient, searchParams]);
};
