import { useState } from 'react';
import Button from '../../ui-components/common/Button';
import FormRow from '../../ui-components/common/FormRow';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/api/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data?.user);
      toast.success('Successfully Logged in');
      navigate('/home');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
    onSettled: () => {
      setEmail('');
      setPassword('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('All the fields are required');
      return;
    }
    login({ email, password });
  };

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <FormRow label={'Email'}>
        <input
          type="email"
          id="email"
          className="input"
          placeholder="example@gmail.com"
          autoComplete="email"
          required
          disabled={isLoggingIn}
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label={'Password'}>
        <input
          type="password"
          id="password"
          className="input"
          placeholder="password"
          autoComplete="current-password"
          required
          disabled={isLoggingIn}
          minLength={8}
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <Button type="primary" fullWidth disabled={isLoggingIn}>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
