'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  FileText, 
  RefreshCw, 
  XCircle,
  DownloadCloud,
  Mail,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  updateOrderStatus, 
  generateOrderInvoice, 
  cancelOrder, 
  refundOrder 
} from '../actions';
import { getFileUrl } from '@/app/lib/storage';

const STATUS_OPTIONS = [
  'pending', 
  'processing', 
  'shipped', 
  'delivered', 
  'cancelled', 
  'refunded'
];

const STATUS_ICONS = {
  pending: Package,
  processing: RefreshCw,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
  refunded: AlertTriangle
};

export default function OrderDetailView({ order }) {
  const [currentStatus, setCurrentStatus] = useState(order.orderStatus);
  const [isStatusEditing, setIsStatusEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log('Order:', order);

  const handleStatusChange = async (newStatus) => {
    setIsLoading(true);
    try {
      const updatedOrder = await updateOrderStatus(order.id, newStatus);
      setCurrentStatus(updatedOrder.orderStatus);
      toast.success('Order status updated successfully');
      setIsStatusEditing(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateInvoice = async () => {
    setIsLoading(true);
    try {
      const result = await generateOrderInvoice(order.id);
      toast.success('Invoice generated');
      // Optionally open or download the invoice
      window.open(result.invoicePath, '_blank');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    const reason = prompt('Please provide a reason for cancellation:');
    if (reason) {
      setIsLoading(true);
      try {
        await cancelOrder(order.id, reason);
        toast.success('Order cancelled successfully');
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRefundOrder = async () => {
    const reason = prompt('Please provide a reason for refund:');
    if (reason) {
      setIsLoading(true);
      try {
        await refundOrder(order.id, reason);
        toast.success('Order refunded successfully');
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const StatusIcon = STATUS_ICONS[currentStatus] || Package;

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Order #{order.id.slice(-8)}</h1>
            <p className="text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {isStatusEditing ? (
              <div className="flex gap-2">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={isLoading}
                    className={`px-3 py-1 text-xs rounded-full capitalize 
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
                  onClick={() => setIsStatusEditing(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div 
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100"
                onClick={() => setIsStatusEditing(true)}
              >
                <StatusIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium capitalize text-blue-500">
                  {currentStatus}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Order Actions</h2>
          <div className="flex gap-4">
            {/* <button
              onClick={handleGenerateInvoice}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100"
            >
              <FileText className="h-4 w-4" />
              Generate Invoice
            </button> */}
            <button
              onClick={handleCancelOrder}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"
            >
              <XCircle className="h-4 w-4" />
              Cancel Order
            </button>
            <button
              onClick={handleRefundOrder}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-600 rounded-full hover:bg-yellow-100"
            >
              <AlertTriangle className="h-4 w-4" />
              Refund
            </button>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{order.user.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{order.user.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{order.user.phoneNumber || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
        <div>
          <p className="font-medium">{order.shippingAddress.fullName}</p>
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

      {/* Order Items */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4 pb-4 border-b last:border-b-0">
            <div className="relative h-20 w-20 bg-gray-100 rounded-lg">
              {item.product.images[0] ? (
                <Image
                  src={getFileUrl(item.product.images[0])}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
              <p className="font-semibold">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t flex justify-between">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold">
            ₹{order.totalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Payment Status</p>
            <p className="font-medium capitalize">{order.paymentInfo.status}</p>
          </div>
          <div>
            <p className="text-gray-500">Razorpay Order ID</p>
            <p className="font-medium">{order.paymentInfo.razorpayOrderId}</p>
          </div>
          {order.paymentInfo.razorpayPaymentId && (
            <div>
              <p className="text-gray-500">Razorpay Payment ID</p>
              <p className="font-medium">{order.paymentInfo.razorpayPaymentId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
