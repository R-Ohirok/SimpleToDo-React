import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '../api/todos';

const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export default useAddTodo;