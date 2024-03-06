import { useMutation } from '@tanstack/react-query';
import { deleteBlog as deleteBlogApi } from '../../services/api/blog';
import toast from 'react-hot-toast';

export default function useDeleteBlog() {
  const {
    isPending: isDeleting,
    status: deletionStatus,
    mutate: deleteBlog,
  } = useMutation({
    mutationFn: deleteBlogApi,
    onSuccess: () => {
      toast.success('The blog is deleted successfully!');
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return { isDeleting, deletionStatus, deleteBlog };
}
