'use server'

import { requireAuth } from '@/app/lib/auth';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { connectDB } from '@/app/lib/db';

// Make sure Product model is registered before using it
import '@/models/Product';

export async function getOrders() {
  await connectDB();
  const user = await requireAuth();

  try {
    const orders = await Order.find({ user: user.id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name image price discountedPrice')
      .lean();

    console.log('Orders:', orders);

    // Convert to plain objects and clean up
    return orders.map(order => ({
      id: order._id.toString(),
      items: order.items.map(item => ({
        // Generate a unique ID for the item if _id is not available
        id: (item._id || new Date().getTime() + Math.random()).toString(),
        product: {
          id: item.product._id.toString(),
          name: item.product.name,
          image: item.product.image || null, // Handle missing image
          price: item.product.price,
          discountedPrice: item.product.discountedPrice
        },
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: order.totalAmount,
      shippingAddress: {
        fullName: order.shippingAddress.fullName,
        addressLine1: order.shippingAddress.addressLine1,
        addressLine2: order.shippingAddress.addressLine2 || '',
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        pincode: order.shippingAddress.pincode,
        phoneNumber: order.shippingAddress.phoneNumber
      },
      paymentInfo: {
        razorpayOrderId: order.paymentInfo.razorpayOrderId,
        status: order.paymentInfo.status
      },
      orderStatus: order.orderStatus,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString()
    }));
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw new Error('Failed to load orders. Please try again.');
  }
}

export async function getOrderDetails(orderId) {
  await connectDB();
  const user = await requireAuth();

  try {
    const order = await Order.findOne({ 
      _id: orderId, 
      user: user.id 
    })
    .populate('items.product')
    .lean();

    if (!order) {
      throw new Error('Order not found');
    }

    return {
      _id: order._id.toString(),
      items: order.items.map(item => ({
        product: {
          _id: item.product._id.toString(),
          name: item.product.name,
          images: item.product.images,
          price: item.product.price
        },
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: order.totalAmount,
      shippingAddress: order.shippingAddress,
      paymentInfo: order.paymentInfo,
      orderStatus: order.orderStatus,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString()
    };
  } catch (error) {
    console.error('Failed to fetch order details:', error);
    throw new Error('Failed to load order details. Please try again.');
  }
}
