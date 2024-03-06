import { useParams } from 'react-router-dom';
import ArticlePreview from './ArticlePreview';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAuthorsBlogs, getBlogById } from '../../services/api/blog';
import Error from '../../ui-components/common/Error';
import Loader from '../../ui-components/common/Loader';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import useThemeContext from '../../contexts/useThemeContext';
import { useEffect, useState } from 'react';
import AsideCard from './AsideCard';
import Comments from './Comments';

function BlogDetail() {
  const { id } = useParams();
  const { isDarkMode } = useThemeContext();
  const queryClient = useQueryClient();
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [isLoadingAside, setIsLoadingAside] = useState(false);

  const { isLoading, data, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlogById(id),
  });

  const editor = useBlockNote(
    {
      editable: false,
      // defaultStyles: true,
      initialContent: data ? JSON.parse(data.blog.content) : [],
    },
    [data],
  );

  useEffect(() => {
    if (!data) return;
    async function fetchAuthorsPost(id) {
      try {
        setIsLoadingAside(true);
        const { blogs } = await getAuthorsBlogs(id);
        setAuthorBlogs(blogs);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoadingAside(false);
      }
    }
    fetchAuthorsPost(data.blog.author._id);
  }, [data]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['blog', id], ['comments', id]);
    };
  }, [id, queryClient]);

  if (isLoading) {
    return (
      <div className="mt-48 flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="mt-48 flex h-full w-full items-center justify-center">
        <Error>There was some problem loading the blog!</Error>
      </div>
    );
  }

  const blog = data.blog;
  const { author, description, title, publishedAt, coverImage } = blog;

  return (
    <article className="py-8 lg:grid lg:grid-cols-[1fr_25rem] lg:gap-6">
      <header className="col-span-2">
        <ArticlePreview
          author={author}
          description={description}
          title={title}
          publishedAt={publishedAt}
          usedIn="blog-detail"
        />
      </header>
      <div className="col-span-2 aspect-video h-full w-full pt-4">
        <img
          className="h-full w-full rounded-xl object-cover"
          src={coverImage}
        />
      </div>

      <article className="py-4">
        <BlockNoteView editor={editor} theme={isDarkMode ? 'dark' : 'light'} />
      </article>
      <Comments blogId={blog._id || id} />
      <aside className="text-neutral-700 md:col-end-3 md:row-start-3">
        <h3 className="border-b-2 border-brand-500">
          More Posts by <span className="font-medium">{author.name}</span>
        </h3>
        <div className="flex flex-col gap-3 pt-4">
          {isLoadingAside ? (
            <Loader />
          ) : authorBlogs.length > 0 ? (
            authorBlogs
              .slice(0, 4)
              .map((blog) => <AsideCard blog={blog} key={blog.id} />)
          ) : (
            <p className="text-neutral-700"> No blogs Found! </p>
          )}
        </div>
      </aside>
    </article>
  );
}
export default BlogDetail;
