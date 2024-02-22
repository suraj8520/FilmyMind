import { twMerge } from 'tailwind-merge';
import Tag from '../../ui-components/common/Tag';
import AuthorInfo from './AuthorInfo';

function ArticlePreview({ usedIn }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-2">
      <div className="flex flex-col items-start gap-2">
        <Tag>Movies</Tag>
        <h2 className="text-lg font-semibold text-neutral-800 sm:text-xl ">
          Transformers Toughest Autobot Was Born From a Forgotten TV Show
        </h2>
        <p
          className={twMerge(
            'text-neutral-600',
            usedIn === 'trending-section' && 'hidden sm:block',
          )}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus rem
          minus placeat doloribus quaerat ex facilis dolorem corporis magnam
          quidem numquam ab iusto illo tempora aliquam vero praesentium, quia
          at!
        </p>
      </div>
      <AuthorInfo />
    </div>
  );
}
export default ArticlePreview;
