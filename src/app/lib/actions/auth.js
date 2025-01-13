'use server'

// app/lib/actions/auth.js
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { User } from '@/models/User'
import { connectDB } from '../db'

// In-memory OTP store 
const otpStore = new Map()

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
})

export async function sendOTP(email) {
  
  await connectDB()

  // Rate limiting
  const storedData = otpStore.get(email)
  if (storedData && Date.now() - storedData.timestamp < 60000) { // 1 minute
    throw new Error('Please wait before requesting another OTP')
  }

  const otp = Math.floor(100000 + Math.random() * 900000)
  otpStore.set(email, {
    otp,
    timestamp: Date.now(),
    attempts: 0
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your Festique Login OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF6B6B;">Welcome to Festique</h1>
          <p>Your OTP for login is: <strong style="font-size: 24px; color: #4ECDC4;">${otp}</strong></p>
          <p>This OTP will expire in 10 minutes.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">If you didn't request this OTP, please ignore this email.</p>
        </div>
      `
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send OTP:', error)
    throw new Error('Failed to send OTP')
  }
}

export async function verifyOTP(email, otp) {
  try {
    await connectDB()

    const storedData = otpStore.get(email)
    
    if (!storedData) {
      throw new Error('OTP expired or not found')
    }

    if (Date.now() - storedData.timestamp > 600000) { // 10 minutes
      otpStore.delete(email)
      throw new Error('OTP expired')
    }

    if (storedData.otp !== parseInt(otp)) {
      storedData.attempts += 1
      if (storedData.attempts >= 3) {
        otpStore.delete(email)
        throw new Error('Too many failed attempts')
      }
      throw new Error('Invalid OTP')
    }

    // Clear OTP
    otpStore.delete(email)

    // Find or create user
    let user = await User.findOne({ email })
    const isNewUser = !user

    if (!user) {
      user = await User.create({
        name: email.split('@')[0], // Default name from email
        email: email,
        role: 'user', // Default role
        isVerified: true,
        phoneNumber: null, // No phone number initially
        addresses: [], // Empty addresses array
        orders: [], // Empty orders array
        lastLogin: new Date()
      })
    } else {
      // Update last login for existing user
      user.lastLogin = new Date()
      user.isVerified = true
      await user.save()
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    console.log("token generation success ", token)

    // Set HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    console.log("cookie set success")

    // cookies().set('auth-token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    //   maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    // })

    return { 
      success: true, 
      isNewUser,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  } catch (error) {
    console.error('Login verification error:', error);
    throw error;
  }
}

export async function logout() {
  cookies().delete('auth-token')
}

export async function updateProfile(userId, data) {
  
  
  await connectDB()
  
  // Validate user exists
  const user = await User.findById(userId)
  if (!user) {
    throw new Error('User not found')
  }
  
  // Update user data
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true, runValidators: true }
  )
  
  return { success: true, user: updatedUser }
}

export async function sendOrderStatusUpdateEmail(email, orderId, newStatus, reason = null) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Order #${orderId.slice(-8)} Status Update`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Order Status Update</h1>
          <p>Your order <strong>#${orderId.slice(-8)}</strong> status has been updated.</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>New Status:</strong> ${newStatus.toUpperCase()}</p>
            ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
          </div>
          <p>
            You can check the full details of your order by logging into your account 
            or contacting our customer support.
          </p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            ${new Date().getFullYear()} Madhuraj System Solutions. All rights reserved.
          </p>
        </div>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send order status update email:', error);
    // We don't want to throw an error here as it might interrupt the main process
    return { success: false, error: error.message };
  }
}