'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Image as ImageIcon, 
  Edit2 
} from 'lucide-react';
import { updateOrderStatus } from '../actions';
import { toast } from 'sonner';

const statusOptions = [
  'pending', 
  'processing', 
  'shipped', 
  'delivered', 
  'cancelled', 
  'refunded'
];

const statusMap = {
  'pending': { icon: Package, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  'processing': { icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
  'shipped': { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50' },
  'delivered': { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
  'cancelled': { icon: Package, color: 'text-red-500', bg: 'bg-red-50' },
  'refunded': { icon: Package, color: 'text-gray-500', bg: 'bg-gray-50' }
};

export default function OrderCard({ order }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.orderStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setIsLoading(true);
    try {
      const updatedOrder = await updateOrderStatus(order.id, newStatus);
      setCurrentStatus(updatedOrder.orderStatus);
      toast.success('Order status updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update order status');
    } finally {
      setIsLoading(false);
    }
  };

  const status = statusMap[currentStatus] || statusMap.pending;
  const StatusIcon = status.icon;

  console.log('Order:', order);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6">
      <Link href={`/admin/orders/${order.id}`} className="block">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order placed {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm font-medium">Order #{order.id.slice(-8)}</p>
                <p className="text-sm text-gray-600">
                  Customer: {order.user.name} ({order.user.email})
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    {statusOptions.map((status, index) => (
                      <button
                        key={`status-${index}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleStatusChange(status);
                        }}
                        disabled={isLoading}
                        className={`px-2 py-1 text-xs rounded-full capitalize 
                          ${currentStatus === status 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {status}
                      </button>
                    ))}
                    <button
                      key="cancel-edit"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditing(false);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div 
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditing(true);
                    }}
                  >
                    <StatusIcon className={`h-4 w-4 ${status.color}`} />
                    <span className={`text-sm font-medium capitalize ${status.color}`}>
                      {currentStatus}
                    </span>
                    <Edit2 className="h-3 w-3 text-gray-500 ml-1" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={`order-item-${index}`} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded-lg">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={`${item.product.name} image`}
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
