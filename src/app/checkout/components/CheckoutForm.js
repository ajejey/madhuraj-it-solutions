'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import Script from 'next/script';
import { useCart } from '@/app/lib/contexts/CartContext';
import { toast } from 'sonner';
import { sendOrderConfirmationEmail } from '@/app/lib/actions/email';
import { createNewOrder, validateAndPrepareItems } from '../actions';

export function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  

  const handleRazorpayScriptLoad = () => {
    setRazorpayLoaded(true);
  };

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      
      // Step 1: Validate and prepare items
      setLoadingMessage('Validating and preparing products...');
      const validatedItems = await validateAndPrepareItems(cart.items);
      
      // Step 2: Create Razorpay order
      setLoadingMessage('Creating payment order...');
      const totalAmount = validatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      const razorpayResponse = await fetch('/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: totalAmount })
      });
      
      if (!razorpayResponse.ok) {
        throw new Error('Failed to create Razorpay order');
      }
      
      const { id: razorpayOrderId } = await razorpayResponse.json();
      
      // Step 3: Prepare order data
      const orderData = {
        items: validatedItems,
        shippingAddress: {
          fullName: formData.fullName,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phoneNumber: formData.phoneNumber
        },
        razorpayOrderId
      };
      
      // Step 4: Create order in database
      setLoadingMessage('Finalizing order...');
      const orderResponse = await createNewOrder(orderData);
      
      // Step 5: Proceed with Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID,
        amount: totalAmount * 100,
        currency: 'INR',
        name: 'Madhuraj System Solutions',
        description: 'Product Purchase',
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            setIsLoading(true);
            // Verify payment via API
            setLoadingMessage('Verifying payment...');
            const verifyResponse = await fetch('/api/verifyOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                orderId: orderResponse.id,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });

            const verificationResult = await verifyResponse.json();

            if (verificationResult.isOk) {
              // Send confirmation email
              setLoadingMessage('Sending order confirmation...');
              try {
                await sendOrderConfirmationEmail(verificationResult.orderId);
              } catch (emailError) {
                console.error('Failed to send order confirmation email:', emailError);
                // Non-critical error, so we'll still proceed
              }

              // Clear cart and show success
              setLoadingMessage('Order completed! Redirecting...');
              toast.success('Order placed successfully!');
              
              // Remove order in progress flag
              sessionStorage.removeItem('orderInProgress');
              
              router.push(`/orders/${verificationResult.orderId}?clearCart=true`);
              // clearCart();
            } else {
              throw new Error(verificationResult.message || 'Payment verification failed');
            }
          } catch (verifyError) {
            console.error('Payment verification error:', verifyError);
            toast.error('Payment verification failed. Please contact support.');
            setIsLoading(false);
            sessionStorage.removeItem('orderInProgress');
          }
        },
        prefill: {
          name: formData.fullName,
          email: 'user@example.com', // Replace with actual user email
          contact: formData.phoneNumber
        },
        notes: {
          orderId: orderResponse.id
        },
        theme: {
          color: '#3399cc'
        }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error(error.message || 'Failed to process order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        onLoad={handleRazorpayScriptLoad}
      />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-semibold text-center">
              {loadingMessage || 'Processing your order...'}
            </p>
          </div>
        </div>
      )}

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
              Processing
            </>
          ) : (
            'Place Order'
          )}
        </button>
      </form>
    </>
  );
}
