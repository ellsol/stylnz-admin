'use client';

import useUsers from '@/api/hooks/useUsers';

const UsersPage = () => {
  const { data } = useUsers();
  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UsersPage;
