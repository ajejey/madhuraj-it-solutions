import { getOrders } from '../actions';
import OrderCard from './OrderCard';
import EmptyOrders from './EmptyOrders';

export default async function OrdersList() {
  const orders = await getOrders();

  if (!orders || orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
