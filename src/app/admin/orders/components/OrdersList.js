import { getAdminOrders } from '../actions';
import OrderCard from './OrderCard';
import EmptyOrders from './EmptyOrders';
import OrdersFilter from './OrdersFilter';

export default async function OrdersList() {
  const { orders, pagination } = await getAdminOrders();

  if (!orders || orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="space-y-6">
      <OrdersFilter />
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
