import { PER_PAGE } from "../constants/constants";
import type { ToDoType } from "../types/ToDoType";

export const getVisibleTodos = (todos: ToDoType[], activePage: number) => {
  const start = (activePage - 1) * PER_PAGE;
  const end = Math.min(todos.length, (activePage * PER_PAGE))

  return todos.slice(start, end);
};