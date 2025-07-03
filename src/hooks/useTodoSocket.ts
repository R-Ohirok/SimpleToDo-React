import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import type { ToDoType, TodosParams } from '../types';
import camelcaseKeys from 'camelcase-keys';
import { BASE_URL } from '../constants/constants';

const socket = io(BASE_URL);

export const useTodoSocket = (params: TodosParams) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleUpdate = (updatedTodoSnake: ToDoType) => {

      const updatedTodo: ToDoType = camelcaseKeys(updatedTodoSnake, { deep: true });
      queryClient.setQueryData(['todos', params], (oldData: any) => {
        console.log(updatedTodo);

        return {
          ...oldData,
          todos: oldData.todos.map((todo: ToDoType) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
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