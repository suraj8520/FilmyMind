import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/api/user';

const useGetUser = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return { isLoading, user: data?.user, error };
};

export default useGetUser;
