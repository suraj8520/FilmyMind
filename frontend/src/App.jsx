import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AppLayout from './ui-components/Layouts/AppLayout';
import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Account from './pages/Account';
import About from './pages/About';
import GlobalUIProvider from './contexts/GlobalUIProvider';
import ThemeToggle from './ui-components/common/ThemeToggle';
import ThemeProvider from './contexts/ThemeProvider';
import ProtectedRoute from './ui-components/common/ProtectedRoute';
import DashBoardLayout from './ui-components/Layouts/DashBoardLayout';
import Overview from './pages/Overview';
import DashboardBlogs from './pages/DashboardBlogs';
import Authors from './pages/Authors';
import CreateBlog from './pages/CreateBlog';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalUIProvider>
        <ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} position="top-left" />
          <ThemeToggle />
          <Toaster
            position="top-center"
            gutter={8}
            toastOptions={{ duration: 3000 }}
          />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="/home" />} />
                <Route path="home" element={<Home />} />
                <Route path="blog/:id" element={<Blog />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="about" element={<About />} />
                <Route
                  path="account"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  }
                />
              </Route>
              {/** Add protected option here. */}
              <Route path="dashboard" element={<DashBoardLayout />}>
                <Route index element={<Navigate replace to="overview" />} />
                <Route path="overview" element={<Overview />} />
                <Route path="blogs" element={<DashboardBlogs />} />
                <Route path="authors" element={<Authors />} />
                <Route path="create-blog" element={<CreateBlog />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </GlobalUIProvider>
    </QueryClientProvider>
  );
}

export default App;
