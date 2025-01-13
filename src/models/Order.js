import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required in order']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Minimum quantity is 1']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required for order']
  },
  items: [OrderItemSchema],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  shippingAddress: {
    fullName: {
      type: String,
      required: [true, 'Full name is required']
    },
    addressLine1: {
      type: String,
      required: [true, 'Address line 1 is required']
    },
    addressLine2: String,
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required']
    }
  },
  paymentInfo: {
    razorpayOrderId: {
      type: String,
      required: [true, 'Razorpay Order ID is required']
    },
    razorpayPaymentId: String,
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    }
  },
  orderStatus: {
    type: String,
    enum: [
      'pending', 
      'processing', 
      'shipped', 
      'delivered', 
      'cancelled', 
      'refunded'
    ],
    default: 'pending'
  },
  trackingNumber: String,
  deliveryPartner: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for order total items
OrderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
