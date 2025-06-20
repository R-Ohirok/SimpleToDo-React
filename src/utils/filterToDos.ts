import type { FilterStatusType, ToDoType } from '../types';

export const filterTodos = (
  todos: ToDoType[],
  title: string,
  status: FilterStatusType,
) => {
  if (status === 'All') {
    return todos.filter(todo => todo.title.includes(title));
  }

  return todos.filter(todo =>
    status === 'Active'
      ? !todo.isCompleted && todos.filter(todo => todo.title.includes(title))
      : todo.isCompleted && todos.filter(todo => todo.title.includes(title)),
  );
};
