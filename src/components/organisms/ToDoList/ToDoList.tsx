import type React from 'react';
import styles from './ToDoList.module.scss';
import type { ToDoType } from '../../../types/ToDoType';
import ToDoItem from '../../molecules/ToDoItem/ToDoItem';

interface Props {
  todos: ToDoType[];
  deleteToDo: (todoId: string) => void;
}

const ToDoList: React.FC<Props> = ({ todos, deleteToDo }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <ToDoItem key={todo.id} todo={todo} deleteToDo={deleteToDo} />
      ))}
    </ul>
  );
};

export default ToDoList;
