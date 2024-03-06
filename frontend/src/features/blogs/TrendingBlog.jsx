import ArticlePreview from './ArticlePreview';

function TrendingBlog({ blog }) {
  const { coverImage, author, category, description, publishedAt, title } =
    blog;
  return (
    <div className="relative w-full rounded-xl shadow-md">
      <div className="aspect-square h-full w-full sm:aspect-video">
        <img
          className="h-full w-full rounded-xl object-cover"
          src={coverImage}
        />
      </div>
      <div className="absolute left-[50%] top-[50%] w-[90%] max-w-[32rem] translate-x-[-50%] rounded-xl bg-neutral-50 p-6 shadow-md sm:bottom-[-2.5rem] sm:left-10 sm:top-auto sm:translate-x-0">
        <ArticlePreview
          usedIn="trending-section"
          author={author}
          category={category}
          description={description}
          title={title}
          publishedAt={publishedAt}
        />
      </div>
    </div>
  );
}

export default TrendingBlog;
