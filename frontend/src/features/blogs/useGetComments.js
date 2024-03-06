import { useQuery } from '@tanstack/react-query';
import { getCommentsOfBlog } from '../../services/api/blog';

export default function useGetComments(blogId) {
  const { isLoading, data, error } = useQuery({
    queryFn: () => getCommentsOfBlog(blogId),
    queryKey: ['comments', blogId],
  });

  return { isLoading, data, error };
}
