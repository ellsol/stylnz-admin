import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import axios from 'axios';
import { CURRENT_ENV } from '@/config/config';
import { LoginForm } from '@/app/login/page';
import { LocalStorageStore } from '@/api/token_store';
import { useRouter } from 'next/navigation';
import { Token } from '@/api/models';

const useLogin = (
  options?: UseMutationOptions<Token, DefaultError, LoginForm>,
) => {
  const router = useRouter();
  return useMutation({
    ...options,
    mutationFn: async (credentials) => {
      const response = await axios.post<Token>(
        `${CURRENT_ENV.ipServiceURL}/api/v1/admin/users/token`,
        {
          ...credentials,
          audiences: [CURRENT_ENV.audience],
        },
      );
      new LocalStorageStore().setToken(response.data);
      return response.data;
    },
    onSuccess: () => {
      router.push('/users');
    },
  });
};

export default useLogin;
