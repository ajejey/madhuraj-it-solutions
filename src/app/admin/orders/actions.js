'use server'

import { requireAuth, requireRole } from '@/app/lib/auth';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { User } from '@/models/User';
import { connectDB } from '@/app/lib/db';

// Ensure models are registered
import '@/models/Order';
import '@/models/Product';
import '@/models/User';

export async function getAdminOrders(page = 1, limit = 10, filters = {}) {
  await connectDB();
  
  // Verify admin authentication
  const user = await requireAuth();
  await requireRole('admin');

  try {
    // Construct filter object
    const filterQuery = {};
    if (filters.status) filterQuery.orderStatus = filters.status;
    if (filters.startDate && filters.endDate) {
      filterQuery.createdAt = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate)
      };
    }

    // Pagination and population
    const orders = await Order.find(filterQuery)
      .sort({ createdAt: -1 })
      .populate({
        path: 'user',
        select: 'name email'
      })
      .populate({
        path: 'items.product',
        select: 'name image price'
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Count total orders for pagination
    const totalOrders = await Order.countDocuments(filterQuery);

    // Transform orders to plain objects
    const transformedOrders = orders.map(order => ({
      id: order._id.toString(),
      user: {
        id: order.user._id.toString(),
        name: order.user.name,
        email: order.user.email
      },
      items: order.items.map(item => ({
        id: item._id ? item._id.toString() : null,
        product: {
          id: item.product._id.toString(),
          name: item.product.name,
          image: item.product.image,
          price: item.product.price
        },
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: order.totalAmount,
      orderStatus: order.orderStatus,
      createdAt: order.createdAt.toISOString(),
      shippingAddress: order.shippingAddress
    }));

    return {
      orders: transformedOrders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders
      }
    };
  } catch (error) {
    console.error('Failed to fetch admin orders:', error);
    throw new Error('Failed to load orders. Please try again.');
  }
}

export async function updateOrderStatus(orderId, newStatus) {
  await connectDB();
  
  // Verify admin authentication
  const user = await requireAuth();
  await requireRole('admin');

  try {
    const order = await Order.findByIdAndUpdate(
      orderId, 
      { orderStatus: newStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      throw new Error('Order not found');
    }

    return {
      id: order._id.toString(),
      orderStatus: order.orderStatus
    };
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw new Error('Failed to update order status. Please try again.');
  }
}
