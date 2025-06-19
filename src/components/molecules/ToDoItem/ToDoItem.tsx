import type React from 'react';
import styles from './ToDoItem.module.scss';
import cn from 'classnames';
import type { ToDoType } from '../../../types/ToDoType';

interface Props {
  todo?: ToDoType;
}

export const ToDoItem: React.FC<Props> = ({ todo = { id:1, title:'test', isCompleted: false } }) => {
  const { id, title, isCompleted } = todo;
  return (
    <li className={styles.todoItem}>
      <input
        name={id.toString()}
        type="checkbox"
        className={styles.todoItemStatus}
        defaultChecked={isCompleted}
        // checked={isCompleted}
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
        ></button>
      </div>
    </li>
  );
};
