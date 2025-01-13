'use server';

import { requireAuth, requireRole } from '@/app/lib/auth';
import { connectDB } from '@/app/lib/db';
import { User } from '@/models/User';
// import { requireAuth } from '@/app/lib/auth';
// import { requireRole } from '@/app/lib/middleware';

export async function fetchUsers(page = 1, limit = 10, search = '') {
  await requireAuth();
  await requireRole(['admin']);
  await connectDB();

  const query = search 
    ? { 
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ] 
      } 
    : {};

  const totalUsers = await User.countDocuments(query);
  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return {
    users: users.map(user => ({
      ...user,
      id: user._id.toString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    })),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers
    }
  };
}

export async function updateUserRole(userId, newRole) {
  await requireAuth();
  await requireRole(['admin']);
  await connectDB();

  const validRoles = ['user', 'admin', 'runner'];
  if (!validRoles.includes(newRole)) {
    throw new Error('Invalid role');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId, 
    { role: newRole }, 
    { new: true }
  ).select('-password');

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return {
    ...updatedUser.toObject(),
    id: updatedUser._id.toString()
  };
}

export async function deleteUser(userId) {
  await requireAuth();
  await requireRole(['admin']);
  await connectDB();

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new Error('User not found');
  }

  return { success: true, message: 'User deleted successfully' };
}

export async function fetchUserDetails(userId) {
  await requireAuth();
  await requireRole(['admin']);
  await connectDB();

  const user = await User.findById(userId)
    .populate({
      path: 'orders',
      select: 'orderStatus totalAmount createdAt',
      options: { sort: { createdAt: -1 }, limit: 5 }
    })
    .lean();

  if (!user) {
    throw new Error('User not found');
  }

  // Transform the user data
  return {
    ...user,
    id: user._id.toString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    orders: user.orders.map(order => ({
      ...order,
      id: order._id.toString(),
      createdAt: order.createdAt.toISOString()
    }))
  };
}
