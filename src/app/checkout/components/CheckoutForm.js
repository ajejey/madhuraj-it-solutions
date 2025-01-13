'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/app/lib/contexts/CartContext';
import { createOrder } from '../actions';
import { toast } from 'sonner';

export function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log('Cart data:', cart); // Debug log
      
      // Ensure cart items are properly structured
      const items = cart.items.map(item => {
        console.log('Cart item:', item); // Debug log
        return {
          product: item.id, // Map id to product
          quantity: item.quantity,
          price: item.price,
          image: item.image
        };
      });

      console.log('Formatted items:', items); // Debug log

      const orderData = {
        ...data,
        items,
        totalAmount: cart.totalAmount
      };

      console.log('Order data:', orderData); // Debug log
      
      const order = await createOrder(orderData);
      console.log('Order placed successfully!');
      
      // Clear the cart
      clearCart();
      
      // Show success message
      toast.success('Order placed successfully!');
      
      // Redirect to orders page after a short delay
      setTimeout(() => {
        router.push('/orders');
      }, 1500); // Wait for 1.5s so user can see the success message
    } catch (error) {
      console.error('Order error:', error); // Debug log
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Contact Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Please enter a valid Indian phone number'
                }
              })}
              className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1
            </label>
            <input
              type="text"
              {...register('addressLine1', { required: 'Address is required' })}
              className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="House/Flat No., Building Name"
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              {...register('addressLine2')}
              className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Street, Area (Optional)"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                {...register('city', { required: 'City is required' })}
                className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                {...register('state', { required: 'State is required' })}
                className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                {...register('pincode', {
                  required: 'Pincode is required',
                  pattern: {
                    value: /^\d{6}$/,
                    message: 'Please enter a valid 6-digit pincode'
                  }
                })}
                className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
            Processing...
          </>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  );
}
