import { requireAuth, requireRole } from '@/app/lib/auth';
import { fetchUserDetails } from '../actions';
import UserDetailsView from './components/UserDetailsView';

export const metadata = {
  title: 'User Details | Admin',
  description: 'Detailed view of user information'
};

export default async function UserDetailsPage({ params }) {
  await requireAuth();
  await requireRole(['admin']);

  const userDetails = await fetchUserDetails(params.userId);

  return (
    <div className="container mx-auto px-4 py-20">
      <UserDetailsView user={userDetails} />
    </div>
  );
}
