import { useCallback, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import type { ToDoType, TodosParams } from '../types';
import camelcaseKeys from 'camelcase-keys';
import { BASE_URL } from '../constants/constants';

const socket = io(BASE_URL);

export const useTodoSocket = (params: TodosParams) => {
  const queryClient = useQueryClient();

  const matchesParams = useCallback(
    (todo: ToDoType) => {
      if (params.status === 'Active' && todo.isCompleted) {
        return false;
      }

      if (params.status === 'Completed' && !todo.isCompleted) {
        return false;
      }

      if (!todo.title.includes(params.title)) {
        return false;
      }

      return true;
    },
    [params],
  );

  useEffect(() => {
    const handleUpdate = (updatedTodoSnake: ToDoType) => {
      const updatedTodo: ToDoType = camelcaseKeys(updatedTodoSnake, {
        deep: true,
      });

      queryClient.setQueryData(['todos', params], (oldData: any) => {
        if (!oldData) return oldData;

        const isMatch = matchesParams(updatedTodo);

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

    socket.on('todo-updated', handleUpdate);

    return () => {
      socket.off('todo-updated', handleUpdate);
    };
  }, [params, queryClient]);
};
