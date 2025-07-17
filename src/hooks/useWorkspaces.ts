import { useQuery } from '@tanstack/react-query';
import { getAllWorkspaces } from '../api/workspace';

const useWorkspaces = () => {
  const { data, isLoading, isPending, isError, refetch } = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => getAllWorkspaces(),
  });

  return {
    workspaces: data ?? [],
    isLoading,
    isError,
    isPending,
    refetch,
  };
};

export default useWorkspaces;
