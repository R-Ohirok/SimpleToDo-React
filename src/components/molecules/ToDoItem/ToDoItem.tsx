import type React from 'react';
import styles from './ToDoItem.module.scss';
import cn from 'classnames';
import { memo, useCallback, useEffect, useState } from 'react';
import { normalizeValue } from '../../../utils/normalizeValue';
import type { ToDoType } from '../../../types';
import Skeleton from '@mui/material/Skeleton';

interface Props {
  todo: ToDoType;
  onDelete: (todoId: string) => void;
  onChangeStatus: (todoId: string) => void;
  onChangeTitle: (todoId: string, newTitle: string) => void;
}

const ToDoItem: React.FC<Props> = memo(
  ({ todo, onDelete, onChangeStatus, onChangeTitle }) => {
    const { id, title, isCompleted } = todo;

    const [isEditing, setIsEditing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }, []);

    const handleDelete = useCallback(() => onDelete(todo.id), []);
    const handleChangeStatus = useCallback(() => onChangeStatus(todo.id), []);
    const handleSelectTodo = useCallback(() => {
      setIsEditing(true);
    }, [title]);
    const handleEditTodo = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const newTitle = normalizeValue(
          formData.get('todoItemInput') as string,
        );

        if (newTitle === title) {
          setIsEditing(false);

          return;
        }

        if (!newTitle) {
          handleDelete();
          setIsEditing(false);

          return;
        }

        onChangeTitle(id, newTitle);
        setIsEditing(false);
      },
      [],
    );

    return (
      <li className={styles.todoItem}>
        {isVisible ? (
          <>
            <input
              name={id.toString()}
              type="checkbox"
              className={styles.todoItemStatus}
              checked={isCompleted}
              onChange={handleChangeStatus}
            />

            {isEditing ? (
              <form
                onBlur={handleEditTodo}
                onSubmit={handleEditTodo}
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
          </>
        ) : (
          <Skeleton
            variant="rectangular"
            height={32}
            width="100%"
            sx={{ bgcolor: 'grey.500', borderRadius: '6px' }}
            animation="wave"
          />
        )}
      </li>
    );
  },
);

export default ToDoItem;
