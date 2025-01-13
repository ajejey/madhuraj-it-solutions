// import { requireAuth } from '@/app/lib/auth';
// import { requireRole } from '@/app/lib/middleware';
import { requireAuth, requireRole } from '@/app/lib/auth';
import { fetchUsers } from './actions';
import UsersList from './components/UsersList';

export const metadata = {
  title: 'Users Management | Admin',
  description: 'Manage and view all users in the system'
};

export default async function UsersPage() {
  await requireAuth();
  await requireRole(['admin']);

  const users = await fetchUsers();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
      </div>
      <UsersList initialUsers={users} />
    </div>
  );
}
