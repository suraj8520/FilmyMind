import UpdateUserData from '../features/account/UpdateUserData';
import UpdateUserPassword from '../features/account/UpdateUserPassword';
import useLogout from '../features/authentication/useLogout';
import Button from '../ui-components/common/Button';
import { MdLogout } from 'react-icons/md';

function Account() {
  const { logout } = useLogout();

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-8 px-2 py-8">
      <div className="flex items-center justify-between">
        <h1 className="heading text-3xl">Update your account</h1>
        <Button variant="danger" onClick={() => logout()}>
          {' '}
          Log Out
          <MdLogout size={24} />
        </Button>
      </div>
      <UpdateUserData />
      <UpdateUserPassword />
    </div>
  );
}
export default Account;
