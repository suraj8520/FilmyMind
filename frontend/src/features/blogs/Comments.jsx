import { useState } from 'react';
import Button from './../../ui-components/common/Button';
import useGetUser from './../authentication/useGetUser';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../../services/api/blog';
import useGetComments from './useGetComments';
import Loader from '../../ui-components/common/Loader';
import Error from '../../ui-components/common/Error';
import CommentCard from './CommentCard';

function Comments({ blogId }) {
  const { user } = useGetUser();
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useGetComments(blogId);
  const { isPending, mutate: postComment } = useMutation({
    mutationFn: ({ blogId, comment }) => createComment(blogId, comment),
    onSuccess: () => {
      toast.success('Comment posted successfully!');
      queryClient.invalidateQueries(['comment', blogId]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      toast.error('Login first to post the comment!!');
      return;
    }
    if (!comment) return;
    postComment(
      { blogId, comment },
      {
        onSuccess: () => {
          setComment('');
        },
      },
    );
  }

  console.log(data);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-medium text-brand-500">
        Comments{' '}
        <span className="text-neutral-600">
          {data ? data.comments.length : 0}
        </span>
      </h2>
      <form
        className="flex gap-1 rounded-xl bg-neutral-200"
        onClick={handleSubmit}
      >
        <input
          className="w-full rounded-xl bg-neutral-200 p-2 px-4 text-neutral-800 focus:outline-none"
          placeholder="write your thoughts..."
          value={comment}
          onChange={(e) => {
            if (!user) {
              toast.error('Login to comment');
              return;
            }
            setComment(e.target.value);
          }}
          disabled={isPending}
        />
        <Button variant="primary" size="small" disabled={isPending}>
          Post
        </Button>
      </form>
      <div className="flex flex-col gap-2">
        {isLoading && <Loader />}
        {error && <Error>There was some problem loading the comments</Error>}
        {data &&
          data.comments.map((comment) => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
      </div>
    </section>
  );
}
export default Comments;
