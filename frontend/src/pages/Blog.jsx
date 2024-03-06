import BlogDetail from '../features/blogs/BlogDetail';

function Blog() {
  return (
    // <div className="h-fit w-full bg-neutral-50">
    <div className="scrollbar-gutter min-h-screen bg-neutral-50 px-4 ">
      <div className="mx-auto max-w-screen-xl">
        <BlogDetail />
      </div>
    </div>
  );
}
export default Blog;
