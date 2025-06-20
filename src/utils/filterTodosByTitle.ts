import type { ToDoType } from '../types/ToDoType';

export const filterTodosByTitle = (todos: ToDoType[], title: string) => {
  return todos.filter(todo => todo.title.includes(title));
};
