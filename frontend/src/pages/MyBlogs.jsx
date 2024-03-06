import { LiaEdit } from 'react-icons/lia';
import Button from './../ui-components/common/Button';
import { Link, useParams } from 'react-router-dom';
import Drafts from '../features/blogs/Drafts';
import PublishedBlogs from '../features/blogs/PublishedBlogs';
function MyBlogs() {
  const { type } = useParams();

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 py-8">
      <div className="flex items-center justify-between ">
        <h1 className="heading text-3xl">Your Blogs</h1>
        <Button variant="primary">
          <LiaEdit size={24} />
          Create Blog
        </Button>
      </div>
      <div className="space-x-6">
        <Link
          className={`pb-4 font-medium text-neutral-500 hover:text-neutral-800 ${type === 'drafts' ? 'border-b border-b-neutral-800 text-neutral-800' : ''}`}
          to={'/my-blogs/drafts'}
        >
          Drafts
        </Link>
        <Link
          className={`pb-4 font-medium text-neutral-500 hover:text-neutral-800 ${type === 'published' ? 'border-b border-b-neutral-800 text-neutral-800' : ''}`}
          to={'/my-blogs/published'}
        >
          Published
        </Link>
      </div>
      <div className="pt-4">
        {type === 'drafts' ? <Drafts /> : <PublishedBlogs />}
      </div>
    </div>
  );
}
export default MyBlogs;
