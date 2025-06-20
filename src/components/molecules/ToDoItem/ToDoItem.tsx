import type React from 'react';
import styles from './ToDoItem.module.scss';
import cn from 'classnames';
import type { ToDoType } from '../../../types/ToDoType';
import { memo, useCallback } from 'react';

interface Props {
  todo: ToDoType;
  onDelete: (todoId: string) => void;
  onStatusChange: (todoId: string) => void;
}

const ToDoItem: React.FC<Props> = memo(
  ({ todo, onDelete, onStatusChange }) => {
    const { id, title, isCompleted } = todo;

    const handleDelete = useCallback(() => onDelete(todo.id), []);
    const handleStatusChange = useCallback(() => onStatusChange(todo.id), []);

    return (
      <li className={styles.todoItem}>
        <input
          name={id.toString()}
          type="checkbox"
          className={styles.todoItemStatus}
          checked={isCompleted}
          onChange={handleStatusChange}
        />

        <span
          className={cn(styles.todoItemTitle, {
            [styles.todoItemTitleCompleted]: isCompleted,
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
            onClick={handleDelete}
          ></button>
        </div>
      </li>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.todo.id === nextProps.todo.id &&
      prevProps.todo.title === nextProps.todo.title &&
      prevProps.todo.isCompleted === nextProps.todo.isCompleted
    );
  },
);

export default ToDoItem;
