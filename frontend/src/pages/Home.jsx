import BlogGrid from '../features/blogs/BlogGrid';
import TrendingBlog from '../features/blogs/TrendingBlog';

function Home() {
  return (
    <div className="mx-auto flex h-fit max-w-screen-2xl flex-col gap-36 px-4">
      {/* <Modal>
        <Modal.Button id="test">
          <p>Consider this a button</p>
        </Modal.Button>
        <Modal.Window id="test">
          <p>this is the modal</p>
        </Modal.Window>
      </Modal> */}
      <TrendingBlog />

      <div className="flex flex-col gap-8">
        <h2 className="heading border-b-4 border-brand-500 pb-1 text-center text-2xl">
          Latest Posts
        </h2>
        <BlogGrid />
      </div>
    </div>
  );
}
export default Home;
