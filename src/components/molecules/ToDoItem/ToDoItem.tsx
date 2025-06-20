import type React from 'react';
import styles from './ToDoItem.module.scss';
import cn from 'classnames';
import { memo, useCallback, useState } from 'react';
import { normalizeValue } from '../../../utils/normalizeValue';
import type { ToDoType } from '../../../types';

interface Props {
  todo: ToDoType;
  onDelete: (todoId: string) => void;
  onChangeStatus: (todoId: string) => void;
  changeTitle: (todoId: string, newTitle: string) => void;
}

const ToDoItem: React.FC<Props> = memo(
  ({ todo, onDelete, onChangeStatus, changeTitle }) => {
    const { id, title, isCompleted } = todo;

    const [isEditing, setIsEditing] = useState(false);

    let newTitle = title;

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      newTitle = event.target.value;
    };

    const handleDelete = useCallback(() => onDelete(todo.id), []);
    const handleChangeStatus = useCallback(() => onChangeStatus(todo.id), []);
    const handleSelectTodo = useCallback(() => {
      setIsEditing(true);
    }, [title]);
    const handleEditTodo = useCallback(
      (event: React.FormEvent<HTMLFormElement>, newTitle: string) => {
        event.preventDefault();

        const cleanTitle = normalizeValue(newTitle);

        if (cleanTitle === title) {
          setIsEditing(false);

          return;
        }

        if (!cleanTitle) {
          handleDelete();
          setIsEditing(false);

          return;
        }

        changeTitle(id, cleanTitle);
        setIsEditing(false);
      },
      [],
    );

    return (
      <li className={styles.todoItem}>
        <input
          name={id.toString()}
          type="checkbox"
          className={styles.todoItemStatus}
          checked={isCompleted}
          onChange={handleChangeStatus}
        />

        {isEditing ? (
          <form
            onBlur={event => handleEditTodo(event, newTitle)}
            onSubmit={event => handleEditTodo(event, newTitle)}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setIsEditing(false);
              }
            }}
          >
            <input
              name="todoItemInput"
              type="text"
              className={styles.todoItemInput}
              placeholder="Empty todo will be deleted"
              defaultValue={title}
              onChange={event => handleChangeTitle(event)}
              autoFocus
            />
          </form>
        ) : (
          <>
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
                onClick={handleSelectTodo}
              ></button>
              <button
                className={cn(
                  styles.todoItemControlBtn,
                  styles.todoItemControlBtnDelete,
                )}
                onClick={handleDelete}
              ></button>
            </div>
          </>
        )}
      </li>
    );
  },
);

export default ToDoItem;
