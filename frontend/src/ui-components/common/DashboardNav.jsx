import { Link, useLocation } from 'react-router-dom';
import useGetUser from '../../features/authentication/useGetUser';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdOutlineArticle } from 'react-icons/md';
import { LiaUserEditSolid } from 'react-icons/lia';
import { IoCreateOutline } from 'react-icons/io5';
import { CgMoveRight } from 'react-icons/cg';

function NavLink({ title, path, icon }) {
  const location = useLocation();
  const active = location.pathname.split('/')[2] === path;
  return (
    <li
      className={`px-10 py-4 text-neutral-700 transition-all hover:bg-neutral-100   ${active ? 'bg-neutral-100 font-medium' : ''}`}
    >
      <Link to={path} className="flex items-center gap-4">
        <span
          className={`hover:text-brand-500 ${active ? 'text-brand-500' : 'text-neutral-400'}`}
        >
          {icon}
        </span>

        <span>{title}</span>
      </Link>
    </li>
  );
}

function DashboardNav() {
  const { user } = useGetUser();
  const role = user ? user.role : '';

  return (
    <nav className="row-start-2 min-w-fit max-w-64 bg-neutral-50 py-4">
      <ul className="h-full">
        <NavLink
          path={'overview'}
          title={'Overview'}
          icon={<LuLayoutDashboard size={24} />}
        />
        <NavLink
          path={'blogs'}
          title={role === 'admin' ? 'All Blogs' : 'My Blogs'}
          icon={<MdOutlineArticle size={24} />}
        />
        {role === 'admin' && (
          <NavLink
            path={'authors'}
            title={'Authors'}
            icon={<LiaUserEditSolid size={24} />}
          />
        )}
        {role === 'writer' && (
          <NavLink
            path={'create-blog'}
            title={'Create Blog'}
            icon={<IoCreateOutline size={24} />}
          />
        )}
        <NavLink
          path={'/'}
          title={'View Site'}
          icon={<CgMoveRight size={24} />}
        />
      </ul>
    </nav>
  );
}
export default DashboardNav;
