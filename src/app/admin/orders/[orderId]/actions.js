'use server'

import { requireAuth, requireRole } from '@/app/lib/auth';
import { Order } from '@/models/Order';
import { connectDB } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { generateInvoicePDF } from '@/lib/invoice-generator';
import { sendOrderStatusUpdateEmail } from '@/app/lib/actions/auth';
// import { sendOrderStatusUpdateEmail } from '@/lib/email-service';

export async function updateOrderStatus(orderId, newStatus) {
  await connectDB();
  const user = await requireAuth();
  await requireRole('admin');

  try {
    const order = await Order.findByIdAndUpdate(
      orderId, 
      { 
        orderStatus: newStatus,
        statusUpdatedBy: user.id,
        statusUpdateReason: `Status changed to ${newStatus}`
      },
      { new: true, runValidators: true }
    ).populate('user');

    if (!order) {
      throw new Error('Order not found');
    }

    // Send email notification to customer
    await sendOrderStatusUpdateEmail(
      order.user.email, 
      order.id, 
      newStatus
    );

    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin/orders');

    return {
      id: order._id.toString(),
      orderStatus: order.orderStatus
    };
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw new Error('Failed to update order status. Please try again.');
  }
}

export async function generateOrderInvoice(orderId) {
  await connectDB();
  await requireAuth();
  await requireRole('admin');

  try {
    const order = await Order.findById(orderId)
      .populate('user')
      .populate('items.product');

    if (!order) {
      throw new Error('Order not found');
    }

    // Generate PDF Invoice
    const invoicePath = await generateInvoicePDF(order);

    return {
      message: 'Invoice generated successfully',
      invoicePath
    };
  } catch (error) {
    console.error('Failed to generate invoice:', error);
    throw new Error('Failed to generate invoice. Please try again.');
  }
}

export async function cancelOrder(orderId, reason) {
  await connectDB();
  const user = await requireAuth();
  await requireRole('admin');

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: 'cancelled',
        cancellationReason: reason,
        cancelledBy: user.id
      },
      { new: true, runValidators: true }
    ).populate('user');

    if (!order) {
      throw new Error('Order not found');
    }

    // Send cancellation email
    await sendOrderStatusUpdateEmail(
      order.user.email, 
      order.id, 
      'cancelled',
      reason
    );

    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin/orders');

    return {
      id: order._id.toString(),
      orderStatus: order.orderStatus
    };
  } catch (error) {
    console.error('Failed to cancel order:', error);
    throw new Error('Failed to cancel order. Please try again.');
  }
}

export async function refundOrder(orderId, refundReason) {
  await connectDB();
  const user = await requireAuth();
  await requireRole('admin');

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: 'refunded',
        refundReason: refundReason,
        refundedBy: user.id
      },
      { new: true, runValidators: true }
    ).populate('user');

    if (!order) {
      throw new Error('Order not found');
    }

    // Send refund email
    await sendOrderStatusUpdateEmail(
      order.user.email, 
      order.id, 
      'refunded',
      refundReason
    );

    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin/orders');

    return {
      id: order._id.toString(),
      orderStatus: order.orderStatus
    };
  } catch (error) {
    console.error('Failed to process refund:', error);
    throw new Error('Failed to process refund. Please try again.');
  }
}

export async function fetchOrderDetails(orderId) {
  const user = await requireAuth();
  await requireRole('admin');
  await connectDB();
  
  const order = await Order.findById(orderId)
    .populate({
      path: 'user',
      select: 'name email phoneNumber'
    })
    .populate({
      path: 'items.product',
      select: 'name images price description'
    })
    .lean();

  if (!order) {
    throw new Error('Order not found');
  }

  return {
    ...order,
    id: order._id.toString(),
    user: {
      id: order.user._id.toString(),
      name: order.user.name,
      email: order.user.email,
      phoneNumber: order.user.phoneNumber
    },
    items: order.items.map(item => ({
      id: item.product._id.toString(),
      product: {
        ...item.product,
        id: item.product._id.toString()
      },
      quantity: item.quantity,
      price: item.price
    }))
  };
}