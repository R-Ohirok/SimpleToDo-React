import { useQuery } from '@tanstack/react-query';
import { getUserWorkspaces } from '../api/workspace';

const useUserWorkspaces = () => {
  const { data, isLoading, isPending, isError, refetch } =
    useQuery({
      queryKey: ['userWorkspaces'],
      queryFn: () => getUserWorkspaces(),
    });

  return {
    userWorkspaces: data ?? [],
    isLoading,
    isError,
    isPending,
    refetch,
  };
};

export default useUserWorkspaces;
