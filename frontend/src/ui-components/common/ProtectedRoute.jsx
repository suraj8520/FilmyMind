import { Navigate } from 'react-router-dom';
import Error from './Error';
import useGetUser from '../../features/authentication/useGetUser';

function ProtectedRoute({ children, allowedTo = [] }) {
  const { user } = useGetUser();
  console.log(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //   useEffect(() => {
  //     if (!user) {
  //       navigate('/login', { replace: true });
  //     }
  //   }, [user, navigate]);

  if (allowedTo.length > 0 && !allowedTo.includes(user.role))
    return <Error>Unauthorized!</Error>;

  return children;
}
export default ProtectedRoute;
