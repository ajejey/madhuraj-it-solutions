'use client';

import Image from 'next/image';
import { Package, Truck, CheckCircle, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const statusMap = {
  'pending': { icon: Package, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  'processing': { icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
  'shipped': { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50' },
  'delivered': { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' }
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const defaultProductImage = '/images/product-placeholder.jpg';

export default function OrderCard({ order }) {
  const status = statusMap[order.orderStatus] || statusMap.pending;
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6">
      <Link href={`/orders/${order.id}`} className="block">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order placed {formatDate(order.createdAt)}
                </p>
                <p className="text-sm font-medium">Order #{order.id.slice(-8)}</p>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg}`}>
                <StatusIcon className={`h-4 w-4 ${status.color}`} />
                <span className={`text-sm font-medium capitalize ${status.color}`}>
                  {order.orderStatus}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded-lg">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t md:border-l md:border-t-0 pt-4 md:pt-0 md:pl-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Shipping Address</p>
              <div className="text-sm text-gray-500">
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p>{order.shippingAddress.addressLine2}</p>
                )}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                </p>
                <p>Phone: {order.shippingAddress.phoneNumber}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium">Order Total</p>
              <p className="text-2xl font-semibold mt-1">
                ₹{order.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
