import { Outlet } from 'react-router-dom';
import DashboardHeader from './../common/DashboardHeader';
import DashboardNav from '../common/DashboardNav';

function DashBoardLayout() {
  return (
    <div className="scrollbar-gutter grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-neutral-100">
      <DashboardHeader />
      <DashboardNav />
      <main className="overflow-auto px-14 py-12">
        <Outlet />
      </main>
    </div>
  );
}
export default DashBoardLayout;
