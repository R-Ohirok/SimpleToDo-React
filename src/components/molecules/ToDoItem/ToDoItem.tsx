import type React from 'react';
import styles from './ToDoItem.module.scss';
import cn from 'classnames';
import type { ToDoType } from '../../../types/ToDoType';
import { memo, useCallback, useMemo, useState } from 'react';
import { normalizeValue } from '../../../utils/normalizeValue';

interface Props {
  todo: ToDoType;
  onDelete: (todoId: string) => void;
  onChangeStatus: (todoId: string) => void;
  editingTodoId: string;
  setEditingTodoId: (id: string) => void;
  changeTitle: (todoId: string, newTitle: string) => void;
}

const ToDoItem: React.FC<Props> = memo(
  ({
    todo,
    onDelete,
    onChangeStatus,
    editingTodoId,
    setEditingTodoId,
    changeTitle,
  }) => {
    console.log(todo);
    const { id, title, isCompleted } = todo;

    const [todoTitle, setTodoTitle] = useState(title);

    const isEditing = useMemo(() => editingTodoId === id, [editingTodoId]);

    const handleDelete = useCallback(() => onDelete(todo.id), []);
    const handleChangeStatus = useCallback(() => onChangeStatus(todo.id), []);
    const handleSelectTodo = useCallback(() => {
      setEditingTodoId(id);
      setTodoTitle(title);
    }, [title]);
    const handleEditTodo = useCallback(
      (event: React.FormEvent<HTMLFormElement>, newTitle: string) => {
        event.preventDefault();

        const cleanTitle = normalizeValue(newTitle);

        if (cleanTitle === title) {
          setEditingTodoId('');

          return;
        }

        if (!cleanTitle) {
          handleDelete();
          setEditingTodoId('');

          return;
        }

        changeTitle(id, cleanTitle);
        setEditingTodoId('');
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
            onBlur={event => handleEditTodo(event, todoTitle)}
            onSubmit={event => handleEditTodo(event, todoTitle)}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setEditingTodoId('');
              }
            }}
          >
            <input
              type="text"
              className={styles.todoItemInput}
              placeholder="Empty todo will be deleted"
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value)}
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
  (prevProps, nextProps) => {
    return (
      // prevProps.todo.title === nextProps.todo.title &&
      prevProps.todo.isCompleted === nextProps.todo.isCompleted &&
      prevProps.editingTodoId === nextProps.editingTodoId
    );
  },
);

export default ToDoItem;
