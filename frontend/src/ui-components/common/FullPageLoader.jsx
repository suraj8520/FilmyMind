import Loader from './Loader';
function FullPageLoader() {
  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      <Loader />
    </div>
  );
}
export default FullPageLoader;
