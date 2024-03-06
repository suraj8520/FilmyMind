import { useSearchParams } from 'react-router-dom';
import BlogGrid from '../features/blogs/BlogGrid';
import useGetBlogs from '../features/blogs/useGetBlogs';
import FullPageLoader from '../ui-components/common/FullPageLoader';
import Error from '../ui-components/common/Error';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { isLoading, error, data } = useGetBlogs(query);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (error) {
    return <Error>There was error loading the Blogs</Error>;
  }

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4">
      {query ? (
        <>
          <h1 className="text-3xl font-medium text-neutral-500">
            Results for <span className="text-neutral-800">{query}</span>
          </h1>
          <BlogGrid blogs={data.blogs} />
        </>
      ) : (
        <h1>Search something...</h1>
      )}
      {data.numberOfBlogs === 0 && (
        <p className="text-neutral-600">
          Your search{' '}
          <span className="font-medium text-neutral-900">{query}</span> did not
          match any blogs
        </p>
      )}
    </div>
  );
}
export default Search;
