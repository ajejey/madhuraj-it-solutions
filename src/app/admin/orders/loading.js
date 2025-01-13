import OrdersListSkeleton from './components/OrdersListSkeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-8" />
      <OrdersListSkeleton />
    </div>
  );
}
