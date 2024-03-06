import { Link } from 'react-router-dom';
import Logo from './Logo';

import SearchBar from './SearchBar';
import UserNav from './UserNav';
import { LiaEdit } from 'react-icons/lia';
import useGetUser from '../../features/authentication/useGetUser';

function Header() {
  const { user } = useGetUser();
  return (
    <header className="border-b border-neutral-100 bg-neutral-50 px-6 py-3">
      <div className="mx-auto flex items-center justify-between gap-5 ">
        <div className="flex items-center gap-6">
          <Logo usedFor="header" />
          <SearchBar />
        </div>
        <div className="flex flex-row items-center gap-3 sm:gap-5">
          {/* <Nav /> */}
          {user?.role === 'writer' && (
            <Link
              to="/create-blog"
              className="flex items-center justify-between  text-neutral-600"
            >
              <LiaEdit size={32} />
              <span className="hidden pt-1 font-medium sm:block">Write</span>
            </Link>
          )}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
export default Header;
