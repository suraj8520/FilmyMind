import BlogCard from './BlogCard';

function BlogGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {Array.from({ length: 20 }, (_, i) => i).map((item) => (
        <BlogCard key={item} />
      ))}
    </section>
  );
}
export default BlogGrid;
