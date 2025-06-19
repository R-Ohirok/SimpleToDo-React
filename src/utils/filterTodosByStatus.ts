import type { ToDoType } from "../types/ToDoType";

export const filterTodosByStatus = (todos: ToDoType[], show: string) => {
  switch (show) {
    case 'Active': {
      return todos.filter(todo => !todo.isCompleted);
    }

    case 'Completed': {
      return todos.filter(todo => todo.isCompleted);
    }

    case 'All':

    default:
      return todos;
  }
};