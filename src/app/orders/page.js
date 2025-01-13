import { Suspense } from 'react';
import { requireAuth } from '@/app/lib/auth';
import OrdersList from './components/OrdersList';
import OrdersListSkeleton from './components/OrdersListSkeleton';

export const metadata = {
  title: 'Your Orders | Madhuraj System Solutions',
  description: 'View and track your orders from Madhuraj System Solutions',
};

export default async function OrdersPage() {
  await requireAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold mb-8">Your Orders</h1>
      <Suspense fallback={<OrdersListSkeleton />}>
        <OrdersList />
      </Suspense>
    </div>
  );
}
