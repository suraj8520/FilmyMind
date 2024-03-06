import { format } from 'date-fns';
function CommentCard({ comment }) {
  const { user, text, createdAt } = comment;
  const localCreatedAt = new Date(createdAt);
  return (
    <div className="flex gap-3 p-2">
      <div className="w-10">
        <img
          src={user.image ? user.image : '/user.png'}
          alt="user image"
          className="aspect-square w-10 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-neutral-500">{user.name}</p>
        <p className="text-neutral-800">{text}</p>
        <p className="text-xs text-neutral-600">
          {format(localCreatedAt, 'p MMMM dd, yyyy')}
        </p>
      </div>
    </div>
  );
}
export default CommentCard;
