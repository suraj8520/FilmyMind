import { useNavigate } from 'react-router-dom';
import Button from './../ui-components/common/Button';
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-100">
      <div className="card flex flex-col items-center gap-4 p-8">
        <h1 className="heading text-2xl">Not Found</h1>
        <p className="text-neutral-800">
          The page you're looking for is not available!
        </p>
        <Button variant="primary" onClick={() => navigate('/home')}>
          &larr; Go back to home page
        </Button>
      </div>
    </div>
  );
}
export default NotFound;
