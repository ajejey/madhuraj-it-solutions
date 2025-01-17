'use server'

import nodemailer from 'nodemailer';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { User } from '@/models/User';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
});

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

// Generate HTML for customer order confirmation email
const generateCustomerOrderConfirmationHTML = async (order) => {
  // Populate product details
  const populatedItems = await Promise.all(order.items.map(async (item) => {
    const product = await Product.findById(item.product);
    return {
      ...item.toObject(),
      productName: product.name,
      productImage: product.images[0] || ''
    };
  }));

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Madhuraj System Solutions</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #2c3e50;
          background-color: #f4f7f6;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .email-header {
          background-color: #3498db;
          color: white;
          text-align: center;
          padding: 20px;
        }
        .email-header img {
          max-width: 200px;
          margin-bottom: 10px;
        }
        .email-body {
          padding: 30px;
        }
        .order-details {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .order-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 15px;
        }
        .order-item:last-child {
          border-bottom: none;
        }
        .order-item img {
          max-width: 100px;
          max-height: 100px;
          margin-right: 20px;
          border-radius: 8px;
        }
        .order-item-details {
          flex-grow: 1;
        }
        .order-total {
          text-align: right;
          font-weight: 700;
          color: #2c3e50;
        }
        .email-footer {
          background-color: #f4f7f6;
          text-align: center;
          padding: 15px;
          font-size: 12px;
          color: #6c757d;
        }
        @media screen and (max-width: 600px) {
          .email-container {
            width: 100%;
            border-radius: 0;
          }
          .email-body {
            padding: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <img src="https://www.madhurajsystems.com/images/MSSLogo.jpg" alt="Madhuraj System Solutions Logo">
          <h1>Order Confirmation</h1>
        </div>
        
        <div class="email-body">
          <h2>Hello ${order.shippingAddress.fullName},</h2>
          <p>Thank you for your purchase from Madhuraj System Solutions. Your order has been successfully processed.</p>
          
          <div class="order-details">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> #${order._id}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            
            <h4>Shipping Address</h4>
            <p>
              ${order.shippingAddress.fullName}<br>
              ${order.shippingAddress.addressLine1}<br>
              ${order.shippingAddress.addressLine2 ? order.shippingAddress.addressLine2 + '<br>' : ''}
              ${order.shippingAddress.city}, ${order.shippingAddress.state}<br>
              Pincode: ${order.shippingAddress.pincode}
            </p>
          </div>

          <div class="order-items">
            <h3>Items Purchased</h3>
            ${populatedItems.map(item => `
              <div class="order-item">
                <img src="${item.productImage}" alt="${item.productName}">
                <div class="order-item-details">
                  <h4>${item.productName}</h4>
                  <p>Quantity: ${item.quantity}</p>
                  <p>Price: ${formatCurrency(item.price)}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="order-total">
            <h3>Total Amount: ${formatCurrency(order.totalAmount)}</h3>
          </div>

          <p>We'll send you another email with tracking information once your order is shipped.</p>
        </div>

        <div class="email-footer">
          <p> Madhuraj System Solutions. All rights reserved.</p>
          <p>Need help? Contact us at madhurajsystemsolutions@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate HTML for business owner order notification email
const generateBusinessOrderNotificationHTML = async (order) => {
  // Populate product details
  const populatedItems = await Promise.all(order.items.map(async (item) => {
    const product = await Product.findById(item.product);
    return {
      ...item.toObject(),
      productName: product.name,
      productImage: product.images[0] || ''
    };
  }));

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Received - Madhuraj System Solutions</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #2c3e50;
          background-color: #f4f7f6;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .email-header {
          background-color: #3498db;
          color: white;
          text-align: center;
          padding: 20px;
        }
        .email-header img {
          max-width: 200px;
          margin-bottom: 10px;
        }
        .email-body {
          padding: 30px;
        }
        .order-details {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .order-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 15px;
        }
        .order-item:last-child {
          border-bottom: none;
        }
        .order-item img {
          max-width: 100px;
          max-height: 100px;
          margin-right: 20px;
          border-radius: 8px;
        }
        .order-item-details {
          flex-grow: 1;
        }
        .order-total {
          text-align: right;
          font-weight: 700;
          color: #2c3e50;
        }
        .email-footer {
          background-color: #f4f7f6;
          text-align: center;
          padding: 15px;
          font-size: 12px;
          color: #6c757d;
        }
        @media screen and (max-width: 600px) {
          .email-container {
            width: 100%;
            border-radius: 0;
          }
          .email-body {
            padding: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <img src="https://www.madhurajsystems.com/images/MSSLogo.jpg" alt="Madhuraj System Solutions Logo">
          <h1>New Order Received</h1>
        </div>
        
        <div class="email-body">
          <h2>New Order Alert</h2>
          <p>A new order has been placed on Madhuraj System Solutions.</p>
          
          <div class="order-details">
            <h3>Order Information</h3>
            <p><strong>Order Number:</strong> #${order._id}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Order Status:</strong> Processing</p>
            
            <h4>Customer Details</h4>
            <p>
              <strong>Name:</strong> ${order.shippingAddress.fullName}<br>
              <strong>Phone:</strong> ${order.shippingAddress.phoneNumber}<br>
              <strong>Email:</strong> ${order.user.email}
            </p>

            <h4>Shipping Address</h4>
            <p>
              ${order.shippingAddress.fullName}<br>
              ${order.shippingAddress.addressLine1}<br>
              ${order.shippingAddress.addressLine2 ? order.shippingAddress.addressLine2 + '<br>' : ''}
              ${order.shippingAddress.city}, ${order.shippingAddress.state}<br>
              Pincode: ${order.shippingAddress.pincode}
            </p>
          </div>

          <div class="order-items">
            <h3>Ordered Items</h3>
            ${populatedItems.map(item => `
              <div class="order-item">
                <img src="${item.productImage}" alt="${item.productName}">
                <div class="order-item-details">
                  <h4>${item.productName}</h4>
                  <p>Quantity: ${item.quantity}</p>
                  <p>Price: ${formatCurrency(item.price)}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="order-total">
            <h3>Total Order Value: ${formatCurrency(order.totalAmount)}</h3>
          </div>

          <p>Please process this order and update the status accordingly.</p>
        </div>

        <div class="email-footer">
          <p> Madhuraj System Solutions. Administrative Notification</p>
          <p>This is an automated order notification</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Modify the email sending function
export async function sendOrderConfirmationEmail(orderId) {
  try {
    // Fetch the order with populated user
    const order = await Order.findById(orderId).populate('user');
    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    // Generate email HTML for customer
    const customerEmailHTML = await generateCustomerOrderConfirmationHTML(order);

    // Generate email HTML for business
    const businessEmailHTML = await generateBusinessOrderNotificationHTML(order);

    // Send email to customer
    await transporter.sendMail({
      from: `"Madhuraj System Solutions" <${process.env.GMAIL_USERNAME}>`,
      to: order.user.email,
      subject: `Order Confirmation - Order #${order._id}`,
      html: customerEmailHTML
    });

    // Send email to business
    await transporter.sendMail({
      from: `"Madhuraj System Solutions" <${process.env.GMAIL_USERNAME}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: `New Order Received - Order #${order._id}`,
      html: businessEmailHTML
    });

    console.log(`Order confirmation emails sent for order ${orderId}`);
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return false;
  }
}

// Function to send order status update email
export async function sendOrderStatusUpdateEmail(orderId, newStatus) {
  try {
    // Fetch the order with populated user
    const order = await Order.findById(orderId).populate('user');
    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    // Send email to customer about status update
    await transporter.sendMail({
      from: `"Madhuraj System Solutions" <${process.env.GMAIL_USERNAME}>`,
      to: order.user.email,
      subject: `Order Status Update - Order #${order._id}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Status Update</h1>
              <p>Order #${order._id}</p>
            </div>
            <div class="content">
              <p>Your order status has been updated to: <strong>${newStatus}</strong></p>
              <p>Thank you for choosing Madhuraj System Solutions!</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log(`Order status update email sent for order ${orderId}`);
    return true;
  } catch (error) {
    console.error('Error sending order status update email:', error);
    return false;
  }
}
