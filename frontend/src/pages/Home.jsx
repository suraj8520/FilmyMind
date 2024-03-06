import BlogGrid from '../features/blogs/BlogGrid';
import TrendingBlog from '../features/blogs/TrendingBlog';
import useGetBlogs from '../features/blogs/useGetBlogs';
import Error from '../ui-components/common/Error';
import FullPageLoader from '../ui-components/common/FullPageLoader';

function Home() {
  const { isLoading, error, data } = useGetBlogs();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (error) {
    return <Error>There was error loading the Blogs</Error>;
  }

  const { blogs } = data;

  return (
    <div className="mx-auto flex h-fit max-w-screen-2xl flex-col gap-24 px-4 py-8 sm:gap-36">
      <TrendingBlog blog={blogs[1]} />

      <div className="flex flex-col gap-8">
        <h2 className="heading border-b-4 border-brand-500 pb-1 text-center text-2xl">
          Latest Posts
        </h2>
        <BlogGrid blogs={blogs} />
      </div>
    </div>
  );
}
export default Home;
