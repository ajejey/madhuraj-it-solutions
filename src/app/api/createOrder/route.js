import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID,
    key_secret: process.env.RAZORPAY_TEST_KEY_SECRET
});

export async function POST(req) {
    try {
        const { amount } = await req.json();
        
        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(amount * 100), // Convert to paisa
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            notes: {
                // Optional: Add any additional notes
                source: 'web_app'
            }
        });
        
        return NextResponse.json({
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
        });
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        return NextResponse.json({ 
            error: 'Failed to create Razorpay order' 
        }, { status: 500 });
    }
}