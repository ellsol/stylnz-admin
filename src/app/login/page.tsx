'use client';

import { useForm } from 'react-hook-form';
import useLogin from '@/api/hooks/useLogin';

export type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { mutate } = useLogin();
  return (
    <div className={'text-center'}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit((credentials) => mutate(credentials))}>
        <div>
          <input type="email" placeholder={'email'} {...register('email')} />
        </div>
        <div>
          <input
            type="password"
            placeholder={'password'}
            {...register('password')}
          />
        </div>
        <div>
          <input type="submit" value={'Sign In'} />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
