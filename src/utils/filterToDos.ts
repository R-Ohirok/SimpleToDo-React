import type { ToDoType } from '../types';

export const filterTodos = (
  todos: ToDoType[],
  searchParams: URLSearchParams,
) => {
  const title = searchParams.get('title') || '';
  const status = searchParams.get('status') || null;

  if (status) {
    if (status === 'Active') {
      return todos.filter(
        todo => !todo.isCompleted && todo.title.includes(title),
      );
    }

    if (status === 'Completed') {
      return todos.filter(
        todo => todo.isCompleted && todo.title.includes(title),
      );
    }
  }

  return todos.filter(todo => todo.title.includes(title));
};
