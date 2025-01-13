'use server'

import { sendOTP, verifyOTP } from '@/app/lib/actions/auth';

export async function sendLoginOTP(email) {
  try {
    const result = await sendOTP(email);
    return result;
  } catch (error) {
    throw new Error(error.message || 'Failed to send login code');
  }
}

export async function verifyLoginOTP(email, otp) {
  try {
    const result = await verifyOTP(email, otp);
    
    if (result.success) {
      return {
        success: true,
        redirectTo: result.isNewUser ? '/' : '/admin'
      };
    }

    return { success: false };
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
}
