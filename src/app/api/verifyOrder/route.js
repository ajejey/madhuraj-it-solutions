import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { requireAuth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { sendOrderConfirmationEmail } from "@/app/lib/actions/email";

const verifyRazorpaySignature = (
    razorpayOrderId, 
    razorpayPaymentId, 
    razorpaySignature
) => {
    const keySecret = process.env.RAZORPAY_TEST_KEY_SECRET;

    const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");

    return generatedSignature === razorpaySignature;
};

export async function POST(request) {
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
        const { 
            orderId, 
            razorpayPaymentId, 
            razorpaySignature, 
            razorpayOrderId 
        } = await request.json();

        // Validate input
        if (!orderId || !razorpayPaymentId || !razorpaySignature || !razorpayOrderId) {
            return NextResponse.json({ 
                error: 'Missing payment details', 
                isOk: false 
            }, { status: 400 });
        }

        // Connect to database
        await connectDB();

        // Find the order
        const order = await Order.findById(orderId);
        if (!order) {
            return NextResponse.json({ 
                error: 'Order not found', 
                isOk: false 
            }, { status: 404 });
        }

        // Verify order belongs to the authenticated user
        if (order.user.toString() !== user._id.toString()) {
            console.error('Unauthorized access', {
                orderUserId: order.user,
                authenticatedUserId: user._id
            });
            return NextResponse.json({ 
                error: 'Unauthorized access', 
                isOk: false 
            }, { status: 403 });
        }

        // Verify Razorpay signature
        const isSignatureValid = verifyRazorpaySignature(
            razorpayOrderId, 
            razorpayPaymentId, 
            razorpaySignature
        );

        if (!isSignatureValid) {
            return NextResponse.json({ 
                message: "Payment verification failed", 
                isOk: false 
            }, { status: 400 });
        }

        // Update order status
        order.paymentInfo = {
            razorpayOrderId,
            razorpayPaymentId,
            status: 'paid'
        };
        order.orderStatus = 'processing';
        await order.save();

        // Send order confirmation emails
        try {
            await sendOrderConfirmationEmail(order._id);
        } catch (emailError) {
            console.error('Failed to send order confirmation email:', emailError);
            // Non-critical error, so we'll still return success for the order
        }

        return NextResponse.json(
            { 
                message: "Payment verified successfully", 
                isOk: true,
                orderId: order._id.toString()
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { 
                message: "Internal server error", 
                isOk: false,
                error: error.toString()
            },
            { status: 500 }
        );
    }
}