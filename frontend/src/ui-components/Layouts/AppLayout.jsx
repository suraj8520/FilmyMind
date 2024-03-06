import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-100">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default AppLayout;
