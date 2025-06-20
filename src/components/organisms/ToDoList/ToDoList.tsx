import type React from 'react';
import styles from './ToDoList.module.scss';
import type { ToDoType } from '../../../types/ToDoType';
import ToDoItem from '../../molecules/ToDoItem/ToDoItem';
import { memo } from 'react';

interface Props {
  todos: ToDoType[];
  onDelete: (todoId: string) => void;
  onChangeStatus: (todoId: string) => void;
  editingTodoId: string;
  setEditingTodoId: (id: string) => void;
  changeTitle: (todoId: string, newTitle: string) => void;
}

const ToDoList: React.FC<Props> = memo(
  ({
    todos,
    onDelete,
    onChangeStatus,
    editingTodoId,
    setEditingTodoId,
    changeTitle,
  }) => {
    return (
      <ul className={styles.todoList}>
        {todos.map(todo => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onChangeStatus={onChangeStatus}
            editingTodoId={editingTodoId}
            setEditingTodoId={setEditingTodoId}
            changeTitle={changeTitle}
          />
        ))}
      </ul>
    );
  },
);

export default ToDoList;
