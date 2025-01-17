import React from 'react'
import Link from 'next/link';
import { 
  ShoppingCart, 
  Box, 
  Users, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Layers,
  Truck
} from 'lucide-react';
import { getAdminMetrics } from './actions';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { connectDB } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await connectDB();

  const { 
    totalProducts, 
    totalOrders, 
    totalUsers, 
    totalRevenue 
  } = await getAdminMetrics();

  // Additional metrics
  const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });
  const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name')
    .populate('items.product', 'name');

  const DASHBOARD_CARDS = [
    {
      icon: Box,
      title: 'Total Products',
      value: totalProducts,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: ShoppingCart,
      title: 'Total Orders',
      value: totalOrders,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Users,
      title: 'Total Users',
      value: totalUsers,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: DollarSign,
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  const ADDITIONAL_METRICS = [
    {
      icon: AlertTriangle,
      title: 'Low Stock Products',
      value: lowStockProducts,
      color: 'bg-red-100 text-red-600',
      link: '/admin/products?filter=low-stock'
    },
    {
      icon: Layers,
      title: 'Pending Orders',
      value: pendingOrders,
      color: 'bg-orange-100 text-orange-600',
      link: '/admin/orders?status=pending'
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_CARDS.map((card) => (
          <div 
            key={card.title}
            className={`p-6 rounded-2xl shadow-md flex items-center space-x-4 ${card.color}`}
          >
            <div className="p-3 rounded-full bg-white">
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ADDITIONAL_METRICS.map((card) => (
          <Link 
            href={card.link} 
            key={card.title}
            className={`p-6 rounded-2xl shadow-md flex items-center space-x-4 ${card.color} hover:opacity-90 transition-all`}
          >
            <div className="p-3 rounded-full bg-white">
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Orders</h2>
          <Link 
            href="/admin/orders" 
            className="text-primary hover:underline"
          >
            View All Orders
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr 
                  key={order._id.toString()} 
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-sm">
                    <Link 
                      href={`/admin/orders/${order._id}`} 
                      className="text-primary hover:underline"
                    >
                      {order._id.toString().slice(-8)}
                    </Link>
                  </td>
                  <td className="p-3">{order.user.name}</td>
                  <td className="p-3">₹{order.totalAmount.toLocaleString()}</td>
                  <td className="p-3">
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : order.orderStatus === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}