import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../api/todos';
import type { TodosParams, TodosResponse } from '../types';
import { FIRST_PAGE } from '../constants/constants';

const useTodos = (params?: TodosParams) => {
  const {
    data,
    isLoading,
    isPending,
    isError,
    refetch,
  } = useQuery<TodosResponse>({
    queryKey: ['todos', params],
    queryFn: () => getTodos(params),
  });

  return {
    todos: data?.todos ?? [],
    pagesCount: data?.pagesCount ?? 0,
    activePage: data?.activePage ?? FIRST_PAGE,
    isLoading,
    isError,
    isPending,
    refetch,
  };
};

export default useTodos;
