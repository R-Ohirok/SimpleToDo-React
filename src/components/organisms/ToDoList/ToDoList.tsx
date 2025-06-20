import type React from 'react';
import styles from './ToDoList.module.scss';
import type { ToDoType } from '../../../types/ToDoType';
import ToDoItem from '../../molecules/ToDoItem/ToDoItem';

interface Props {
  todos: ToDoType[];
  onDelete: (todoId: string) => void;
  onStatusChange: (todoId: string) => void;
}

const ToDoList: React.FC<Props> = ({ todos, onDelete, onStatusChange }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <ToDoItem key={todo.id} todo={todo} onDelete={onDelete} onStatusChange={onStatusChange} />
      ))}
    </ul>
  );
};

export default ToDoList;
