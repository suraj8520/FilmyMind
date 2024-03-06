import { useQuery } from '@tanstack/react-query';
import { getDrafts } from '../../services/api/blog';
import Error from '../../ui-components/common/Error';
import Loader from '../../ui-components/common/Loader';
import MyBlogCard from './MyBlogCard';

function Drafts() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['drafts'],
    queryFn: getDrafts,
  });

  console.log(data?.blogs);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error>There was some problem loading the drafts</Error>;
  }

  return (
    <div className="space-y-2">
      {data.blogs.length === 0 ? (
        <p className="pt-8 text-xl text-neutral-700">There are not any draft</p>
      ) : (
        data.blogs.map((blog) => (
          <MyBlogCard blog={blog} type="draft" key={blog.id} />
        ))
      )}
    </div>
  );
}
export default Drafts;
