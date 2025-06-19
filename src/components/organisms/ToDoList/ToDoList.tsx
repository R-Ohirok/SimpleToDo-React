import type React from 'react';
import styles from './ToDoList.module.scss';
import type { ToDoType } from '../../../types/ToDoType';
import { ToDoItem } from '../../molecules/ToDoItem';

interface Props {
  todos: ToDoType[];
  deleteToDo: (todoId: string) => void;
  changeStatus: (todoId: string) => void;
}

export const ToDoList: React.FC<Props> = ({ todos, deleteToDo, changeStatus }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <ToDoItem key={todo.id} todo={todo} deleteToDo={deleteToDo} changeStatus={changeStatus} />
      ))}
    </ul>
  );
};
