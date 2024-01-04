import {
  DefaultError,
  UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';
import axios from '@/api/axios';
import { UsersResponse } from '@/api/models';

const useUsers = (
  options?: UndefinedInitialDataOptions<unknown, DefaultError, UsersResponse>,
) => {
  return useQuery({
    ...options,
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get<UsersResponse>('/admin/users');
      return response.data;
    },
  });
};

export default useUsers;
