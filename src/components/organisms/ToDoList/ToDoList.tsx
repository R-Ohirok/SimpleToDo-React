import type React from 'react';
import styles from './ToDoList.module.scss';
import ToDoItem from '../../molecules/ToDoItem/ToDoItem';
import { memo } from 'react';
import type { ToDoType } from '../../../types';
import EmptyList from '../../molecules/EmptyList/EmptyList';
import { useDroppable } from '@dnd-kit/core';
import { Skeleton } from '@mui/material';

interface Props {
  todos: ToDoType[];
  onDelete: (todoId: string) => void;
  onChangeStatus: (todoId: string) => void;
  onChangeTitle: (todoId: string, newTitle: string) => void;
  isLoading: boolean;
}

const ToDoList: React.FC<Props> = memo(
  ({ todos, onDelete, onChangeStatus, onChangeTitle, isLoading }) => {
    const { setNodeRef } = useDroppable({ id: 'todo-list' });

    if (isLoading) {
      return (
        <ul className={styles.todoList}>
          {[...Array(5)].map((_, i) => (
            <li key={i} className={styles.todoListSkeleton}>
              <Skeleton
                variant="rectangular"
                height={32}
                width="100%"
                sx={{ bgcolor: 'grey.500', borderRadius: '6px' }}
                animation="wave"
              />
            </li>
          ))}
        </ul>
      );
    }
    
    return (
      <>
        {todos.length === 0 ? (
          <EmptyList />
        ) : (
          <ul className={styles.todoList} ref={setNodeRef}>
            {todos.map(todo => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onChangeStatus={onChangeStatus}
                onChangeTitle={onChangeTitle}
              />
            ))}
          </ul>
        )}
      </>
    );
  },
);

export default ToDoList;
