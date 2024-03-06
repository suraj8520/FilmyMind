import Error from '../../ui-components/common/Error';
import Loader from '../../ui-components/common/Loader';
import useGetUser from '../authentication/useGetUser';
import MyBlogCard from './MyBlogCard';
import useGetAuthorsBlogs from './useGetAuthorsBlogs';
function PublishedBlogs() {
  const { user } = useGetUser();
  const { isLoading, data, error } = useGetAuthorsBlogs(user.id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error>There was some problem loading the published blogs</Error>;
  }

  const { blogs } = data;

  return (
    <div className="space-y-2">
      {blogs.length === 0 ? (
        <p className="pt-8 text-xl text-neutral-700">There are not any draft</p>
      ) : (
        blogs.map((blog) => (
          <MyBlogCard blog={blog} type="published" key={blog.id} />
        ))
      )}
    </div>
  );
}
export default PublishedBlogs;
