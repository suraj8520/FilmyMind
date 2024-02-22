import Logo from './Logo';
import Nav from './Nav';
import SearchBar from './SearchBar';
import UserNav from './UserNav';

function Header() {
  return (
    <header className="bg-neutral-50 p-3 shadow-sm">
      <div className="mx-auto hidden max-w-screen-2xl items-center justify-between gap-5 lg:grid lg:grid-cols-3">
        <Logo usedFor="header" />
        <Nav />
        <div className="flex flex-row items-center gap-4 justify-self-end">
          <SearchBar />
          <UserNav />
        </div>
      </div>
      {/* <div className="mx-auto hidden max-w-screen-2xl items-center justify-between gap-5 lg:flex">
        <Logo usedFor="header" />
        <Nav />
        <div className="flex flex-row items-center gap-4">
          <SearchBar />
          <UserNav />
        </div>
      </div> */}
      <div className="mx-auto flex max-w-screen-2xl content-between items-center gap-5 lg:hidden">
        <Logo usedFor="header" />
        <div className="flex flex-row items-center gap-3">
          <SearchBar />
          <UserNav />
          <Nav />
        </div>
      </div>
    </header>
  );
}
export default Header;
