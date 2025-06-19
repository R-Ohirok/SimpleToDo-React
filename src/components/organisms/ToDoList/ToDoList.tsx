import type React from "react";
import styles from './ToDoList.module.scss';
import type { ToDoType } from "../../../types/ToDoType";
import ToDoItem from "../../molecules/ToDoItem/ToDoItem";

interface Props {
  todos?: ToDoType[];
};

const testTodos = [
  { id:1, title:'test 1', isCompleted: false },
  { id:2, title:'test 2', isCompleted: true },
  { id:3, title:'test 3', isCompleted: false },
  { id:4, title:'test 4', isCompleted: true },
  { id:5, title:'test 5', isCompleted: false }
];

const ToDoList: React.FC<Props> = ({
  todos = testTodos
}) => {
  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default ToDoList;