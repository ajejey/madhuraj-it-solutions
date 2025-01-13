import { Suspense } from 'react';
import { requireAuth, requireRole } from '@/app/lib/auth';
import OrdersList from './components/OrdersList';
import OrdersListSkeleton from './components/OrdersListSkeleton';

export const metadata = {
  title: 'Admin Orders | Madhuraj System Solutions',
  description: 'Manage and view all customer orders',
};

export default async function AdminOrdersPage() {
  // Verify admin authentication
  await requireAuth();
  await requireRole('admin');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-playfair font-bold">All Orders</h1>
      </div>
      
      <Suspense fallback={<OrdersListSkeleton />}>
        <OrdersList />
      </Suspense>
    </div>
  );
}
