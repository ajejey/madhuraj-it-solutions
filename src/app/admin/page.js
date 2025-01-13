import React from 'react'
import { 
  ShoppingCart, 
  Box, 
  Users, 
  DollarSign 
} from 'lucide-react';
import { getAdminMetrics } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const { 
    totalProducts, 
    totalOrders, 
    totalUsers, 
    totalRevenue 
  } = await getAdminMetrics();

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

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      
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

      {/* Additional dashboard sections can be added here */}
    </div>
  );
}