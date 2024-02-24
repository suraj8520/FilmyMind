import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../ui-components/common/Button';
import FormRow from '../../ui-components/common/FormRow';
import { signup } from '../../services/api/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isSigningUp, mutate: createAccount } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data?.user);
      // I can also access data here.
      toast.success('Account created successfully!');
      reset();
      navigate('/home');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // accept a parameter and based on that parameter make it so that it can be used in create writer as well as user.
  const handleSignUp = () => {
    const data = getValues();
    // We can pass onSuccess, onError or other function along with data. and they should be in object and that will run based on the situation.
    createAccount(data);
  };

  // if (isSigningUp) return <FullPageLoader />;

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleSignUp)}
    >
      <FormRow label={'Name'} error={errors?.name?.message}>
        <input
          type="text"
          id="name"
          className="input"
          placeholder="Enter your name"
          disabled={isSigningUp}
          {...register('name', {
            required: 'The name field is required',
            minLength: {
              value: 3,
              message: "Name can't be less than 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Name can't be more than 20 characters",
            },
          })}
        />
      </FormRow>
      <FormRow label={'Email'} error={errors?.email?.message}>
        <input
          type="email"
          id="email"
          className="input"
          placeholder="example@gmail.com"
          autoComplete="email"
          disabled={isSigningUp}
          {...register('email', {
            required: 'Email is required',
            pattern: /\S+@\S+\.\S+/,
          })}
        />
      </FormRow>
      <FormRow label={'Password'} error={errors?.password?.message}>
        <input
          type="password"
          id="password"
          className="input"
          placeholder="Password"
          autoComplete="new-password"
          disabled={isSigningUp}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: "Password can't be smaller than 8 letters",
            },
          })}
        />
      </FormRow>
      <FormRow
        label={'Confirm Password'}
        error={errors?.confirmPassword?.message}
      >
        <input
          type="password"
          id="confirm-password"
          className="input"
          placeholder="Confirm Password"
          disabled={isSigningUp}
          autoComplete="new-password"
          {...register('confirmPassword', {
            required: 'Confirm password in required',
            validate: (value) =>
              getValues().password === value || 'Passwords do not match',
          })}
        />
      </FormRow>
      <Button type="primary" fullWidth disabled={isSigningUp}>
        Create account
      </Button>
    </form>
  );
}
export default SignUpForm;
