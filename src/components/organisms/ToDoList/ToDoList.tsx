import type React from 'react';
import styles from './ToDoList.module.scss';
import type { ToDoType } from '../../../types/ToDoType';
import ToDoItem from '../../molecules/ToDoItem/ToDoItem';
import { memo } from 'react';

interface Props {
  todos: ToDoType[];
  onDelete: (todoId: string) => void;
  onStatusChange: (todoId: string) => void;
}

const ToDoList: React.FC<Props> = memo(({ todos, onDelete, onStatusChange }) => {
  console.log('render list');
  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <ToDoItem key={todo.id} todo={todo} onDelete={onDelete} onStatusChange={onStatusChange} />
      ))}
    </ul>
  );
});

export default ToDoList;
