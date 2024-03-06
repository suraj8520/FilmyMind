import { useQuery } from '@tanstack/react-query';
import { getAuthorsBlogs } from '../../services/api/blog';

export default function useGetAuthorsBlogs(id) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['author-blogs'],
    queryFn: () => getAuthorsBlogs(id),
  });

  return { isLoading, error, data };
}
