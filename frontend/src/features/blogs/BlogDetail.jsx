import ArticlePreview from './ArticlePreview';

function BlogDetail() {
  // Start integrating with backend and use it.
  return (
    <article className="mt-5 lg:grid lg:grid-cols-[1fr_25rem] lg:gap-6">
      <header className="col-span-2">
        <ArticlePreview />
      </header>
      <div className="col-span-2 aspect-video h-full w-full">
        <img
          className="h-full w-full rounded-xl object-cover"
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>

      <article className="bg-neutral-500">Content</article>
      <section className="bg-green-500 ">Comment Section</section>
      <aside className="bg-red-500 md:col-end-3 md:row-start-3">Trending</aside>
    </article>
  );
}
export default BlogDetail;
