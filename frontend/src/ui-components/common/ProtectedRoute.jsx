import { Navigate } from 'react-router-dom';
import useGetUser from '../../features/authentication/useGetUser';
import FullPageLoader from './FullPageLoader';

function ProtectedRoute({ children }) {
  const { isLoading, user } = useGetUser();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //   useEffect(() => {
  //     if (!user) {
  //       navigate('/login', { replace: true });
  //     }
  //   }, [user, navigate]);

  // if (allowedTo.length > 0 && !allowedTo.includes(user.role))
  //   return <Error>Unauthorized!</Error>;

  return children;
}
export default ProtectedRoute;
