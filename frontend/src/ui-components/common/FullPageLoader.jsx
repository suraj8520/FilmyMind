import Loader from './Loader';
function FullPageLoader() {
  return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen bg-neutral-50">
      <Loader />
    </div>
  );
}
export default FullPageLoader;
