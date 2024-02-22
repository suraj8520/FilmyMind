import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from './../../services/api/user';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success('Successfully Logged out!');
      queryClient.invalidateQueries();
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isLoggingOut, logout };
};

export default useLogout;
