import Logo from './Logo';
import UserNav from './UserNav';

function DashboardHeader() {
  return (
    <header className="col-span-2 bg-neutral-50 p-3 px-6 shadow-sm">
      <div className="mx-auto flex flex-row items-center justify-between gap-5 ">
        <Logo usedFor="header" />
        <UserNav />
      </div>
    </header>
  );
}
export default DashboardHeader;
