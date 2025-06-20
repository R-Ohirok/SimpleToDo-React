import type React from 'react';
import styles from './ToDoItem.module.scss';
import cn from 'classnames';
import type { ToDoType } from '../../../types/ToDoType';

interface Props {
  todo: ToDoType;
  onDelete: (todoId: string) => void;
}

const ToDoItem: React.FC<Props> = ({ todo, onDelete }) => {
  const { id, title, isCompleted } = todo;
  return (
    <li className={styles.todoItem}>
      <input
        name={id.toString()}
        type="checkbox"
        className={styles.todoItemStatus}
        defaultChecked={isCompleted}
      />

      <span
        className={cn(styles.todoItemTitle, {
          [styles.todoItemCompleted]: isCompleted,
        })}
      >
        {title}
      </span>

      <div className={styles.todoItemControl}>
        <button
          className={cn(
            styles.todoItemControlBtn,
            styles.todoItemControlBtnEdit,
          )}
        ></button>
        <button
          className={cn(
            styles.todoItemControlBtn,
            styles.todoItemControlBtnDelete,
          )}
          onClick={() => onDelete(todo.id)}
        ></button>
      </div>
    </li>
  );
};

export default ToDoItem;
