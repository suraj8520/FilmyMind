import { useQuery } from '@tanstack/react-query';
import { getAllBlogs } from '../../services/api/blog';

export default function useGetBlogs(searchParam) {
  const key = 'blogs' + (searchParam ? searchParam : '');

  const { data, isLoading, error } = useQuery({
    queryFn: () => getAllBlogs(searchParam),
    queryKey: [key],
  });

  return { isLoading, error, data };
}
