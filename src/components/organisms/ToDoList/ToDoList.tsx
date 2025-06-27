import type React from 'react';
import styles from './ToDoList.module.scss';
import ToDoItem from '../../molecules/ToDoItem/ToDoItem';
import { memo } from 'react';
import type { ToDoType } from '../../../types';
import EmptyList from '../../molecules/EmptyList/EmptyList';
import { useDroppable } from '@dnd-kit/core';

interface Props {
  todos: ToDoType[];
  onDeleteToDo: (todoId: string) => void;
  onChangeStatus: (todoId: string) => void;
  onChangeTitle: (todoId: string, newTitle: string) => void;
}

const ToDoList: React.FC<Props> = memo(
  ({ todos, onDeleteToDo, onChangeStatus, onChangeTitle }) => {
    const { setNodeRef } = useDroppable({ id: 'todo-list' });
    
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
                onDeleteToDo={onDeleteToDo}
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
