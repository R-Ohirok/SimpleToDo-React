import type { ToDoType } from '../types/ToDoType';
import { filterTodosByStatus } from './filterTodosByStatus';
import { filterTodosByTitle } from './filterTodosByTitle';

export const filterTodos = (
  todos: ToDoType[],
  title: string,
  status: string,
) => {
  return filterTodosByStatus(filterTodosByTitle(todos, title), status);
};
