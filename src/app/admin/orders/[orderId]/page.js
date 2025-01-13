import { Suspense } from 'react';
import { requireAuth, requireRole } from '@/app/lib/auth';
import { Order } from '@/models/Order';
import { connectDB } from '@/app/lib/db';
import OrderDetailView from './components/OrderDetailView';
import OrderDetailSkeleton from './components/OrderDetailSkeleton';
import { fetchOrderDetails } from './actions';

export const metadata = {
  title: 'Order Details | Admin',
  description: 'Detailed view and management of a specific order'
};



export default async function OrderDetailPage({ params }) {
  await requireAuth();
  await requireRole('admin');

  const order = await fetchOrderDetails(params.orderId);

  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailView order={order} />
    </Suspense>
  );
}
