import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxLength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    default: null
  },
  condition: {
    type: String,
    enum: ['new', 'refurbished'],
    required: [true, 'Product condition is required']
  },
  category: {
    type: String,
    required: [true, 'Product category is required']
  },
  subCategory: {
    type: String,
    default: null
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  images: [{
    type: String,
    required: [true, 'At least one product image is required']
  }],
  specifications: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  tags: [String],
  brand: {
    type: String,
    required: [true, 'Product brand is required']
  },
  featured: {
    type: Boolean,
    default: false
  },
  discountedPrice: {
    type: Number,
    default: function() {
      return this.price;
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add any pre-save hooks or virtuals here if needed

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
