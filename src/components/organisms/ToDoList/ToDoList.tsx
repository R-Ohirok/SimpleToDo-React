import type React from 'react';
import styles from './ToDoList.module.scss';
import ToDoItem from '../../molecules/ToDoItem/ToDoItem';
import { memo } from 'react';
import type { ToDoType } from '../../../types';

interface Props {
  todos: ToDoType[];
  onDelete: (todoId: string) => void;
  onChangeStatus: (todoId: string) => void;
  changeTitle: (todoId: string, newTitle: string) => void;
}

const ToDoList: React.FC<Props> = memo(
  ({ todos, onDelete, onChangeStatus, changeTitle }) => {
    return (
      <ul className={styles.todoList}>
        {todos.map(todo => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onChangeStatus={onChangeStatus}
            changeTitle={changeTitle}
          />
        ))}
      </ul>
    );
  },
);

export default ToDoList;
