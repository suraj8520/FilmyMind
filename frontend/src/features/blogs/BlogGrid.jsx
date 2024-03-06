import BlogCard from './BlogCard';

function BlogGrid({ blogs }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {blogs.length !== 0 &&
        blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
    </section>
  );
}
export default BlogGrid;
