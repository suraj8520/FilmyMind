import { useState } from 'react';
import Button from '../../ui-components/common/Button';
import FormRow from '../../ui-components/common/FormRow';
import { useMutation } from '@tanstack/react-query';
import { updateUserPassword } from '../../services/api/user';
import toast from 'react-hot-toast';

const UpdateUserPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const { isPending, mutate: updatePass } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success('Password successfully updated');
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function reset() {
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!oldPassword || !confirmNewPassword || !newPassword) {
      toast.error('All the fields are required!');
      return;
    }

    if (confirmNewPassword !== newPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    updatePass({ oldPassword, newPassword, confirmNewPassword });
  }
  return (
    <div>
      <h2 className="heading mb-4 text-xl">Update User Data</h2>
      <form
        className="card flex flex-col gap-4 px-6 py-8"
        onSubmit={handleSubmit}
      >
        <FormRow label={'Password'} direction="horizontal">
          <input
            type="password"
            className="input w-full"
            value={oldPassword}
            placeholder="●●●●●●●●"
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password"
            disabled={isPending}
          />
        </FormRow>
        <FormRow label={'New Password'} direction="horizontal">
          <input
            type="password"
            className="input w-full"
            value={newPassword}
            placeholder="●●●●●●●●"
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            disabled={isPending}
          />
        </FormRow>
        <FormRow label={'Confirm New Password'} direction="horizontal">
          <input
            type="password"
            className="input w-full"
            value={confirmNewPassword}
            placeholder="●●●●●●●●"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            autoComplete="new-password"
            disabled={isPending}
          />
        </FormRow>
        <div className="flex justify-end gap-1">
          <Button
            size="small"
            variant="secondary"
            onClick={() => {
              reset();
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="primary"
            type="submit"
            disabled={isPending}
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
};
export default UpdateUserPassword;
