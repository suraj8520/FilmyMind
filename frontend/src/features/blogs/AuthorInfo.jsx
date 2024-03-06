import { format } from 'date-fns';
import UserAvatar from '../../ui-components/common/UserAvatar';

function AuthorInfo({ author, publishedAt }) {
  const { image, name } = author ? author : {};
  return (
    <div className="flex items-center justify-between gap-4 text-sm text-neutral-400">
      <UserAvatar image={image} name={name} />
      <p>{publishedAt && format(publishedAt, 'MMMM dd, yyyy')}</p>
    </div>
  );
}
export default AuthorInfo;
