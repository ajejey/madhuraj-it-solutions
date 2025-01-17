'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/app/lib/contexts/CartContext';
import { Loader2, CheckCircle, Package, Truck, Home, ShoppingBag, Gift } from 'lucide-react';
import Image from 'next/image';
import { getFileUrl } from '@/app/lib/storage';
import Link from 'next/link';

export default function OrderDetailsPage({ order, shouldClearCart }) {
  const { clearCart } = useCart();
//   const [order, setOrder] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
  const [isNewOrder, setIsNewOrder] = useState(false);

  // Clear cart if query parameter is set
  useEffect(() => {
    // const shouldClearCart = searchParams.get('clearCart') === 'true';
    if (shouldClearCart) {
      clearCart();
      setIsNewOrder(true);
    }
  }, []);


  // Order status icons mapping
  const orderStatusIcons = {
    pending: <Package className="text-yellow-500" />,
    processing: <Package className="text-blue-500" />,
    shipped: <Truck className="text-green-500" />,
    delivered: <Home className="text-green-600" />,
    cancelled: <CheckCircle className="text-red-500" />,
    refunded: <CheckCircle className="text-purple-500" />
  };


  return (
    <div className="container h-screen mx-auto px-4 py-20">
      {/* New Order Celebration Section */}
      {isNewOrder && (
        <div className="bg-primary/10 border border-primary/20 text-primary-foreground p-6 rounded-2xl mb-8 shadow-sm">
          <div className="flex items-center space-x-4">
            <Gift className="h-10 w-10 text-primary animate-pulse" />
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Order Confirmed!</h2>
              <p className="text-xs text-muted-foreground">
                Order confirmation sent to your email. 
                <span className="block mt-1">
                  Did not receive email? Please check spam your spam folder.
                  Contact us at
                  <a 
                    href="mailto:bharath.rdhanraj@gmail.com" 
                    className="ml-1 text-primary hover:underline"
                  >
                    bharath.rdhanraj@gmail.com
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Order Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <ShoppingBag className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold">Order #{order._id}</h1>
          </div>
          <div className="flex items-center space-x-2">
            {orderStatusIcons[order.orderStatus]}
            <span className="capitalize font-semibold text-lg">{order.orderStatus}</span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Package className="mr-2 text-primary" /> Order Items
            </h2>
            {order.items.map((item) => (
              <div key={item.product._id} className="flex items-center mb-4 pb-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors rounded-xl p-2">
                <Image 
                  src={getFileUrl(item.product.images[0])} 
                  alt={item.product.name} 
                  width={80} 
                  height={80} 
                  className="rounded-xl mr-4 shadow-sm"
                />
                <div>
                  <h3 className="font-medium text-lg">{item.product.name}</h3>
                  <p className="text-gray-600">
                    Quantity: {item.quantity} | ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-between font-semibold mt-4 text-xl">
              <span>Total</span>
              <span className="text-primary">₹{order.totalAmount}</span>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Home className="mr-2 text-primary" /> Shipping Details
            </h2>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600">{order.shippingAddress.phoneNumber}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <p>
                  {order.shippingAddress.addressLine1} 
                  {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                </p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - 
                  {order.shippingAddress.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link 
            href="/products" 
            className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center space-x-2"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
          <Link 
            href="/orders" 
            className="border border-primary text-primary px-6 py-3 rounded-full hover:bg-primary-light hover:text-white transition-colors flex items-center space-x-2"
          >
            <Package className="h-5 w-5" />
            <span>View All Orders</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
