import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required in cart']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Minimum quantity is 1']
  },
  selectedVariant: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  }
}, { _id: false });

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  guestToken: {
    type: String,
    default: null
  },
  items: [CartItemSchema],
  totalItems: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Middleware to update total items and amount
CartSchema.pre('save', async function(next) {
  if (this.isModified('items')) {
    const populatedItems = await Promise.all(
      this.items.map(async (item) => {
        const product = await mongoose.models.Product.findById(item.product);
        return {
          ...item.toObject(),
          productPrice: product.discountedPrice
        };
      })
    );

    this.totalItems = populatedItems.reduce((total, item) => total + item.quantity, 0);
    this.totalAmount = populatedItems.reduce((total, item) => 
      total + (item.quantity * item.productPrice), 0);
  }
  next();
});

export const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
