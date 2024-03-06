import FormRow from '../../ui-components/common/FormRow';
import useGetUser from '../authentication/useGetUser';
import Button from '../../ui-components/common/Button';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUserInfo } from '../../services/api/user';
const UpdateUserData = () => {
  const { user } = useGetUser();
  const queryClient = useQueryClient();
  const [name, setName] = useState(user?.name);
  const [image, setImage] = useState();

  const { isPending, mutate: update } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      toast.success('User Info updated successfully!');
      queryClient.invalidateQueries(['user']);
      setImage(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      toast.error("Fields can't be empty!");
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image);
    update(formData);
  }

  return (
    <div>
      <h2 className="heading mb-4 text-xl">Update User Data</h2>
      <form
        className="card flex flex-col gap-4 px-6 py-8"
        onSubmit={handleSubmit}
      >
        <FormRow label={'Email Address'} direction="horizontal">
          <input
            type="email"
            className="input w-full"
            readOnly
            value={user?.email}
          />
        </FormRow>
        <FormRow label={'Name'} direction="horizontal">
          <input
            type="text"
            className="input w-full"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
          />
        </FormRow>
        <FormRow label={'File'} direction="horizontal">
          <input
            type="file"
            className="w-full text-neutral-600 file:mr-3 file:rounded-lg file:border-none file:bg-brand-500 file:px-4 file:py-2 file:font-medium file:text-white hover:file:cursor-pointer"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            onChange={(e) => setImage(e.target.files[0])}
            disabled={isPending}
          />
        </FormRow>
        <div className="flex justify-end gap-1">
          <Button
            size="small"
            variant="secondary"
            onClick={() => {
              setName(user.name);
              setImage();
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
            Update Account
          </Button>
        </div>
      </form>
    </div>
  );
};
export default UpdateUserData;
