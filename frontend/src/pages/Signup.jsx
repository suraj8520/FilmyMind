import AuthContainer from '../features/authentication/AuthContainer';
import SignUpForm from '../features/authentication/SignUpForm';

function Signup() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-100 p-3">
      <AuthContainer authType="signup">
        <SignUpForm />
      </AuthContainer>
    </div>
  );
}
export default Signup;
