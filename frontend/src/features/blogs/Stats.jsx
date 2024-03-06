import { useSearchParams } from 'react-router-dom';
import Filter from '../../ui-components/common/Filter';
import Stat from './Stat';
import useGetAuthorsBlogs from './useGetAuthorsBlogs';
import Loader from './../../ui-components/common/Loader';
import Error from './../../ui-components/common/Error';
import useGetUser from '../authentication/useGetUser';

function Stats() {
  const [searchParams] = useSearchParams();
  // const {}
  const filter = searchParams.get('filter') || 'week';
  const { user } = useGetUser();
  const { isLoading, data, error } = useGetAuthorsBlogs(user.id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error>There was some problem loading the published blogs</Error>;
  }

  const { blogs } = data;
  let filteredBlogs = blogs;
  // if (filter !== 'lifetime')
  //   filteredBlogs = blogs.filter((blog) => {
  //     console.log(blog.publishedAt);
  //     return true;
  //   });
  console.log(filteredBlogs);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="heading text-xl capitalize">{filter}'s</h2>
        <Filter />
      </div>
      <div className="flex max-w-screen-sm items-center justify-between">
        <Stat label={'Blogs'} number={blogs.length} />
        <Stat label={'Views'} number={5} />
        <Stat label={'Likes'} number={5} />
        <Stat label={'Comments'} number={5} />
      </div>
      <div></div>
    </div>
  );
}
export default Stats;
