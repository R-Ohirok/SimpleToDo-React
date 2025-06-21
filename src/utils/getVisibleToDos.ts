import { ITEMS_PER_PAGE } from '../constants/constants';
import type { ToDoType } from '../types';

export const getVisibleTodos = (todos: ToDoType[], activePage: number) => {
  const start = (activePage - 1) * ITEMS_PER_PAGE;
  const end = Math.min(todos.length, activePage * ITEMS_PER_PAGE);

  return todos.slice(start, end);
};
