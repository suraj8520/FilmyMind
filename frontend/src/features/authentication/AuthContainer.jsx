import { Link } from 'react-router-dom';
import Logo from '../../ui-components/common/Logo';

function AuthContainer({ children, authType = 'login' }) {
  return (
    <div className="flex w-full flex-col items-center gap-4 sm:max-w-[28rem]">
      <Logo />
      <div className="flex w-full flex-col gap-4 rounded-xl bg-neutral-50 p-6 shadow-md sm:px-8 ">
        <h1 className="text-center text-xl font-semibold text-neutral-800">
          {authType === 'login' ? 'Login' : 'Create your account'}
        </h1>
        {children}
        {authType === 'login' ? (
          <p className="text-center text-sm text-neutral-700">
            Don&apos;t have an account?{' '}
            <Link to={'/signup'} className="link">
              Create Account
            </Link>
          </p>
        ) : (
          <p className="text-center text-sm text-neutral-700">
            Already have an account?{' '}
            <Link to={'/login'} className="link">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
export default AuthContainer;
