import { twMerge } from 'tailwind-merge';
import Tag from '../../ui-components/common/Tag';
import AuthorInfo from './AuthorInfo';

function ArticlePreview({
  category,
  title,
  description,
  author,
  publishedAt,
  usedIn = 'aside',
}) {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-2">
      <div className="flex flex-col items-start gap-2">
        <Tag>{category ? category : 'All'}</Tag>
        <h2
          className={twMerge(
            'line-clamp-2 text-lg font-semibold text-neutral-800 sm:text-xl',
            usedIn === 'blog-detail' && 'text-xl sm:text-4xl',
          )}
        >
          {title}
        </h2>
        <p
          className={twMerge(
            'line-clamp-4 text-neutral-600',
            usedIn === 'blog-detail' && 'text-md',
            usedIn === 'aside' && 'hidden',
          )}
        >
          {description}
        </p>
      </div>
      <AuthorInfo author={author} publishedAt={publishedAt} />
    </div>
  );
}
export default ArticlePreview;
