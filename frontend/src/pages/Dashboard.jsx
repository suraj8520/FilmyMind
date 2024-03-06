import Stats from '../features/blogs/Stats';

function Dashboard() {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 py-8">
      <h1 className="heading text-3xl">Your Blogs</h1>
      <Stats />
    </div>
  );
}
export default Dashboard;
