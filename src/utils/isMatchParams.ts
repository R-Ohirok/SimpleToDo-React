import type { TodosParams, ToDoType } from '../types';

const isMatchParams = (todo: ToDoType, params: TodosParams) => {
  if (params.status === 'Active' && todo.isCompleted) {
    return false;
  }

  if (params.status === 'Completed' && !todo.isCompleted) {
    return false;
  }

  if (!todo.title.includes(params.title)) {
    return false;
  }

  return true;
};

export default isMatchParams;
