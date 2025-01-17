'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, Trash2, ImagePlus, X, Tag } from 'lucide-react';
import { createProduct } from '../actions';
import { getFileUrl } from '@/app/lib/storage';

const CATEGORIES = {
  'Electronics': [
    'Computers', 
    'Smartphones', 
    'Accessories', 
    'Peripherals'
  ],
  'Computer Components': [
    'Processors', 
    'Motherboards', 
    'RAM', 
    'Graphics Cards', 
    'Storage', 
    'Power Supplies'
  ],
  'Refurbished': [
    'Laptops', 
    'Desktops', 
    'Tablets', 
    'Smartphones'
  ]
};

export default function ProductForm({ 
  initialData = null, 
  onSubmit, 
  isEditing = false,
  isLoading = false 
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    condition: 'new',
    category: '',
    subCategory: '',
    stock: '',
    images: [],
    specifications: {},
    tags: [],
    brand: '',
    discount: 0,
    ratings: {
      average: 0,
      count: 0
    },
    isActive: true
  });

  const [newTag, setNewTag] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price ? initialData.price.toString() : '',
        stock: initialData.stock ? initialData.stock.toString() : '',
        // images: initialData.images ? initialData.images.map(img => 
        //   typeof img === 'string' ? getFileUrl(img) : img
        // ) : [],
        images: initialData.images || [],
        discount: initialData.discount || 0,
        ratings: initialData.ratings || { average: 0, count: 0 },
        isActive: initialData.isActive !== undefined ? initialData.isActive : true
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  console.log("formData ", formData);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => file);
    
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newImages]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey.trim()]: newSpecValue.trim()
        }
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (keyToRemove) => {
    const { [keyToRemove]: removedSpec, ...remainingSpecs } = formData.specifications;
    setFormData(prev => ({
      ...prev,
      specifications: remainingSpecs
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: selectedCategory,
      subCategory: '' // Reset subcategory when main category changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = ['name', 'description', 'price', 'condition', 'category', 'stock'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (formData.images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    if (onSubmit) {
      // If onSubmit is provided (for edit), pass the formData
      onSubmit(formData);
    } else {
      // Default create product behavior
      try {
        const result = await createProduct(formData);

        if (result.success) {
          toast.success('Product created successfully');
          router.push('/admin/products');
          router.refresh();
        } else {
          toast.error(result.message || 'Failed to create product');
        }
      } catch (error) {
        toast.error('An unexpected error occurred');
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl p-6 shadow-md">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 px-3 py-2"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 px-3 py-2"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 px-3 py-2"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 px-3 py-2"
          />
        </div>

        {/* Original Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Original Price
          </label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            placeholder="Enter original price"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 px-3 py-2"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 px-3 py-2"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 px-3 py-2"
          >
            <option value="">Select Category</option>
            {Object.keys(CATEGORIES).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Condition
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 px-3 py-2"
          >
            <option value="new">New</option>
            <option value="refurbished">Refurbished</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subcategory
          </label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            disabled={!formData.category}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 px-3 py-2 disabled:opacity-50"
          >
            <option value="">Select Subcategory</option>
            {formData.category && CATEGORIES[formData.category].map(subcategory => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        <div className="flex flex-wrap gap-4">
          {formData.images && formData.images.map((image, index) => (
            <div key={index} className="relative">
              <img 
                src={typeof image === 'string' ? getFileUrl(image) : URL.createObjectURL(image)} 
                // src={getFileUrl(image)}
                alt={`Product Image ${index + 1}`} 
                className="w-32 h-32 object-cover rounded-lg"
              />
              {console.log("image inside loop", image)}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full m-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          
          <label className="cursor-pointer">
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-primary transition">
              <ImagePlus className="text-gray-400" size={32} />
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Specifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specifications
        </label>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Specification Key"
            value={newSpecKey}
            onChange={(e) => setNewSpecKey(e.target.value)}
            className="rounded-md border-gray-300 px-3 py-2"
          />
          <input
            type="text"
            placeholder="Specification Value"
            value={newSpecValue}
            onChange={(e) => setNewSpecValue(e.target.value)}
            className="rounded-md border-gray-300 px-3 py-2"
          />
          <button
            type="button"
            onClick={addSpecification}
            className="bg-primary text-white rounded-md px-4 py-2 hover:bg-primary-dark"
          >
            Add Specification
          </button>
        </div>
        {formData && formData.specifications && Object.entries(formData.specifications).length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            {Object.entries(formData.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center mb-2 pb-2 border-b last:border-b-0">
                <div>
                  <span className="font-medium capitalize">{key}: </span>
                  <span>{value}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => removeSpecification(key)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Add Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="rounded-md border-gray-300 px-3 py-2"
          />
          <button
            type="button"
            onClick={addTag}
            className="bg-primary text-white rounded-md px-4 py-2 hover:bg-primary-dark"
          >
            Add Tag
          </button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <div 
                key={tag} 
                className="bg-gray-100 text-slate-700 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
              >
                <span>{tag}</span>
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discount and Active Status */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount Percentage
          </label>
          <input
            type="number"
            name="discount"
            min="0"
            max="100"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Enter discount percentage"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 px-3 py-2"
          />
        </div>

        <div className="flex items-center space-x-2 mt-6">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="rounded text-primary focus:ring-primary"
          />
          <label className="text-sm font-medium text-gray-700">
            Product Active
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition disabled:opacity-50"
        >
          {isEditing ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
