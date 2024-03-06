import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AppLayout from './ui-components/Layouts/AppLayout';
import Blog from './pages/Blog';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Account from './pages/Account';
import GlobalUIProvider from './contexts/GlobalUIProvider';
import ThemeToggle from './ui-components/common/ThemeToggle';
import ThemeProvider from './contexts/ThemeProvider';
import ProtectedRoute from './ui-components/common/ProtectedRoute';
import CreateBlog from './pages/CreateBlog';
import Search from './pages/Search';
import MyBlogs from './pages/MyBlogs';
import Dashboard from './pages/Dashboard';

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
                <Route
                  path="account"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  }
                />
                <Route path="blog/:id" element={<Blog />} />
                <Route path="search" element={<Search />} />
                <Route path="stats" element={<Dashboard />} />
                <Route
                  path="my-blogs/:type"
                  element={
                    <ProtectedRoute>
                      <MyBlogs />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="create-blog"
                element={
                  <ProtectedRoute>
                    <CreateBlog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit-blog/:blogId"
                element={
                  <ProtectedRoute>
                    <CreateBlog />
                  </ProtectedRoute>
                }
              />
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
