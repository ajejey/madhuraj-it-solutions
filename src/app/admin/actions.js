'use server'

import { Product } from '@/models/Product';
import { Order } from '@/models/Order';
import { User } from '@/models/User';
import { connectDB } from '../lib/db';
import { requireRole } from '../lib/auth';
// import { requireRole } from '@/lib/auth';

export async function getAdminMetrics() {
  try {
    // Verify admin role
    await requireRole(['admin']);

    // Connect to database
    await connectDB();

    // Parallel database queries for performance
    const [
      totalProducts, 
      totalOrders, 
      totalUsers, 
      totalRevenue
    ] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Order.aggregate([
        { $match: { 'paymentInfo.status': 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ])
    ]);

    return {
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0
    };
  } catch (error) {
    console.error('Error fetching admin metrics:', error);
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalRevenue: 0
    };
  }
}

// Additional admin-related server actions can be added here