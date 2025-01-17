import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { requireAuth } from '@/app/lib/auth';
import { connectDB } from '@/app/lib/db';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { User } from '@/models/User';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID,
    key_secret: process.env.RAZORPAY_TEST_KEY_SECRET
});

export async function POST(req) {
    try {
        // Verify authentication
        const authPayload = await requireAuth();
        
        // Find the full user object
        const user = await User.findById(authPayload.id);
        
        // Enhanced user validation
        if (!user || !user._id) {
            console.error('Authentication failed or user not found', authPayload);
            return NextResponse.json({ 
                error: 'Authentication failed', 
                details: 'Invalid user object'
            }, { status: 401 });
        }

        // Parse request body
        const { amount, items, shippingDetails } = await req.json();

        // Validate input
        if (!amount || amount <= 0) {
            return NextResponse.json({ 
                error: 'Invalid amount' 
            }, { status: 400 });
        }

        // Connect to database
        await connectDB();

        // Validate and prepare order items
        const orderItems = await Promise.all(items.map(async (item) => {
            // Fetch product to validate and get current price
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Product not found: ${item.product}`);
            }

            return {
                product: product._id,
                quantity: item.quantity,
                price: product.discountedPrice || product.price,
                image: product.image
            };
        }));

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount,
            currency: 'INR',
            receipt: 'order_receipt',
            notes: {
                // Use string representation of user ID
                userId: String(user._id)
            }
        });

        // Create order in database
        const newOrder = new Order({
            user: user._id,
            items: orderItems,
            totalAmount: amount / 100, // Convert from paisa to rupees
            shippingAddress: {
                fullName: shippingDetails.fullName,
                addressLine1: shippingDetails.addressLine1,
                addressLine2: shippingDetails.addressLine2 || '',
                city: shippingDetails.city,
                state: shippingDetails.state,
                pincode: shippingDetails.pincode,
                phoneNumber: shippingDetails.phoneNumber
            },
            paymentInfo: {
                razorpayOrderId: razorpayOrder.id,
                status: 'pending'
            },
            orderStatus: 'pending'
        });

        // Save order
        await newOrder.save();

        return NextResponse.json({
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            orderId: newOrder._id.toString()
        });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ 
            error: 'Failed to create order', 
            details: error.message,
            fullError: error.toString()
        }, { status: 500 });
    }
}