'use server'

import { requireAuth } from '@/app/lib/auth';
import { Order } from '@/models/Order';
import { User } from '@/models/User';
import { Product } from '@/models/Product';
import { connectDB } from '@/app/lib/db';

export async function createOrder(formData) {
  try {
    // Verify authentication
    const user = await requireAuth();
    
    // Connect to database
    await connectDB();

    // Validate order data
    if (!formData.items || !Array.isArray(formData.items) || formData.items.length === 0) {
      throw new Error('No items in cart');
    }

    // Calculate total amount
    const totalAmount = await calculateOrderTotal(formData.items);

    // Validate shipping address
    if (!formData.fullName || !formData.addressLine1 || !formData.city || 
        !formData.state || !formData.pincode || !formData.phoneNumber) {
      throw new Error('All shipping address fields are required');
    }

    // Create the order with validated data
    const order = await Order.create({
      user: user.id,
      items: formData.items,
      totalAmount,
      shippingAddress: {
        fullName: formData.fullName,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2 || '',
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        phoneNumber: formData.phoneNumber
      },
      paymentInfo: {
        razorpayOrderId: 'temp', // Will be updated after Razorpay integration
        status: 'pending'
      }
    });

    // Update user's phone number if different
    if (user.phoneNumber !== formData.phoneNumber) {
      await User.findByIdAndUpdate(user.id, {
        phoneNumber: formData.phoneNumber
      });
    }

    // Add order to user's orders array
    await User.findByIdAndUpdate(user.id, {
      $push: { orders: order._id }
    });

    // Save shipping address to user's addresses if not exists
    const addressExists = await User.findOne({
      _id: user.id,
      'addresses.addressLine1': formData.addressLine1,
      'addresses.pincode': formData.pincode
    });

    if (!addressExists) {
      await User.findByIdAndUpdate(user.id, {
        $push: {
          addresses: {
            fullName: formData.fullName,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2 || '',
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            isDefault: false
          }
        }
      });
    }

    // Convert to plain object and clean up non-serializable fields
    const plainOrder = {
      id: order._id.toString(),
      user: user.id,
      items: order.items.map(item => ({
        product: item.product.toString(),
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount,
      shippingAddress: {
        fullName: order.shippingAddress.fullName,
        addressLine1: order.shippingAddress.addressLine1,
        addressLine2: order.shippingAddress.addressLine2,
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
    };

    return plainOrder;
  } catch (error) {
    console.error('Order creation failed:', error);
    throw new Error(error.message || 'Failed to create order. Please try again.');
  }
}

async function calculateOrderTotal(items) {
  let total = 0;
  
  // Fetch product details and calculate total
  for (const item of items) {
    const product = await Product.findById(item.product);
    
    if (!product) {
      throw new Error(`Product not found: ${item.product}`);
    }
    
    // Validate quantity
    if (item.quantity <= 0) {
      throw new Error(`Invalid quantity for product: ${item.product}`);
    }
    
    // Calculate item total
    total += product.discountedPrice * item.quantity;
  }
  
  return total;
}
