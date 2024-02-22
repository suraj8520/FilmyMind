import useGetUser from '../../features/authentication/useGetUser';
import useLogout from '../../features/authentication/useLogout';
import Menu from '../compound-components/Menu';
import { Link } from 'react-router-dom';
import FullPageLoader from './FullPageLoader';

function UserNav() {
  //Here add if there is no user then do this.
  const { data: user } = useGetUser();
  const { isLoggingOut, logout } = useLogout();

  if (!user) {
    return (
      <Link to="/login" className="link">
        Login
      </Link>
    );
  }

  if (isLoggingOut) return <FullPageLoader />;
  return (
    <div className="relative h-10 min-h-10 w-10 min-w-10">
      <Menu>
        <Menu.Toggle
          id="user-nav"
          openEl={<img src="user.png" alt="User Image" />}
          closeEl={<img src="user.png" alt="User Image" />}
        />
        <Menu.List id="user-nav" className="mt-5">
          <Menu.ListItem>
            <Link to="/account">Profile</Link>
          </Menu.ListItem>
          <Menu.ListItem>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.ListItem>
          <Menu.ListItem>
            <button className="text-red-500" onClick={logout}>
              Logout
            </button>
          </Menu.ListItem>
        </Menu.List>
      </Menu>
    </div>
  );
}
export default UserNav;
