import type React from 'react';
import styles from './ToDoItem.module.scss';
import cn from 'classnames';
import { memo, useCallback, useState } from 'react';
import { normalizeValue } from '../../../utils/normalizeValue';
import type { ToDoType } from '../../../types';
import { useDraggable } from '@dnd-kit/core';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { UPDATE_TODO } from '../../../graphql/mutations';

interface Props {
  todo: ToDoType;
  onDeleteToDo: (todoId: string) => void;
}

const ToDoItem: React.FC<Props> = memo(({ todo, onDeleteToDo }) => {
  const { id, title, isCompleted } = todo;

  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const [updateTodoMutation, { loading: isUpdating }] = useMutation(UPDATE_TODO);

  const handleUpdateToDo = useCallback(
    async (toDoToUpdate: Partial<ToDoType> & { id: string }) => {
      try {
        await updateTodoMutation({
          variables: {
            id: toDoToUpdate.id,
            title: toDoToUpdate.title,
            isCompleted: toDoToUpdate.isCompleted,
          },
        });
      } catch (error) {
        console.error('Failed to update todo:', error);
      }
    },
    [updateTodoMutation],
  );

  const handleDeleteToDo = useCallback(() => {
    onDeleteToDo(id);
  }, [id, onDeleteToDo]);

  const handleChangeStatus = useCallback(() => {
    handleUpdateToDo({ id, isCompleted: !isCompleted });
  }, [handleUpdateToDo, id, isCompleted]);

  const handleSelectTodo = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleChangeTitle = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const newTitle = normalizeValue(formData.get('todoItemInput') as string);

      if (newTitle === title) {
        setIsEditing(false);
        return;
      }

      if (!newTitle) {
        handleDeleteToDo();
        setIsEditing(false);
        return;
      }

      handleUpdateToDo({ id, title: newTitle });
      setIsEditing(false);
    },
    [handleUpdateToDo, handleDeleteToDo, title, id],
  );
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
      }
    },
    [],
  );

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: 'transform 0.2s ease',
      }
    : undefined;

  if (isUpdating) {
    return (
      <li className={styles.todoItem}>
        <Skeleton
          variant="rectangular"
          height={32}
          width="100%"
          sx={{ bgcolor: 'grey.500', borderRadius: '6px' }}
          animation="wave"
        />
      </li>
    );
  }

  return (
    <li className={styles.todoItem} ref={setNodeRef} style={style}>
      <input
        name={id.toString()}
        type="checkbox"
        className={styles.todoItemStatus}
        checked={isCompleted}
        onChange={handleChangeStatus}
      />

      {isEditing ? (
        <form
          onBlur={handleChangeTitle}
          onSubmit={handleChangeTitle}
          onKeyDown={handleKeyDown}
        >
          <input
            aria-label="EditTodoInput"
            name="todoItemInput"
            type="text"
            className={styles.todoItemInput}
            placeholder={t('todoItemInputPlaceholder')}
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
            {...attributes}
            {...listeners}
          >
            {title}
          </span>

          <div className={styles.todoItemControl}>
            <button
              aria-label="EditTodoBtn"
              className={cn(
                styles.todoItemControlBtn,
                styles.todoItemControlBtnEdit,
              )}
              onClick={handleSelectTodo}
            ></button>
            <button
              aria-label="DeleteTodo"
              className={cn(
                styles.todoItemControlBtn,
                styles.todoItemControlBtnDelete,
              )}
              onClick={handleDeleteToDo}
            ></button>
          </div>
        </>
      )}
    </li>
  );
});

export default ToDoItem;
