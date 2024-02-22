import AuthContainer from '../features/authentication/AuthContainer';
import LoginForm from '../features/authentication/LoginForm';

function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-100 p-3">
      <AuthContainer authType="login">
        <LoginForm />
      </AuthContainer>
    </div>
  );
}
export default Login;
