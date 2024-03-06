import useGetUser from '../../features/authentication/useGetUser';
import useLogout from '../../features/authentication/useLogout';
import Menu from '../compound-components/Menu';
import { Link } from 'react-router-dom';
import FullPageLoader from './FullPageLoader';
// import { LiaChartBarSolid, LiaUser } from 'react-icons/lia';
import { LiaUser } from 'react-icons/lia';
import { MdLogout, MdOutlineArticle } from 'react-icons/md';
// can also add activate option
function UserNav() {
  //Here add if there is no user then do this.
  const { user } = useGetUser();
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
          openEl={
            <img
              src={user.image || '/user.png'}
              alt="User Image"
              className="aspect-square w-10 rounded-full object-cover"
            />
          }
          closeEl={
            <img
              src={user.image || '/user.png'}
              alt="User Image"
              className="aspect-square w-10 rounded-full object-cover"
            />
          }
        />
        <Menu.List id="user-nav" className="mt-5">
          <Menu.ListItem>
            <Link to="/account" className={'flex items-center gap-2'}>
              <LiaUser size={24} />
              Profile
            </Link>
          </Menu.ListItem>

          <Menu.ListItem>
            <Link to="/my-blogs/drafts" className={' flex items-center gap-2'}>
              <MdOutlineArticle size={24} />
              <span className="text-nowrap"> My Blogs</span>
            </Link>
          </Menu.ListItem>
          {/* <Menu.ListItem>
            <Link to="/stats" className={'flex items-center gap-2'}>
              {' '}
              <LiaChartBarSolid size={24} />
              Stats
            </Link>
          </Menu.ListItem> */}

          <Menu.ListItem>
            <button
              onClick={logout}
              className={'flex items-center gap-2 font-medium text-red-500'}
            >
              <MdLogout size={24} />
              Logout
            </button>
          </Menu.ListItem>
        </Menu.List>
      </Menu>
    </div>
  );
}
export default UserNav;
