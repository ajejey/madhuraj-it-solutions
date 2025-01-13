'use client';

import { useState } from 'react';
import { Mail, Loader2, CheckCircle } from 'lucide-react';
import { sendLoginOTP, verifyLoginOTP } from '@/app/login/actions';
import { toast } from 'sonner';

export default function CheckoutLoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await sendLoginOTP(email);
      setOtpSent(true);
      toast.success('OTP sent to your email');
    } catch (error) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyLoginOTP(email, otp);
      
      if (result.success) {
        toast.success('Login successful');
        onSuccess();
      } else {
        toast.error('Verification failed');
      }
    } catch (error) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await sendLoginOTP(email);
      toast.success('New OTP sent to your email');
    } catch (error) {
      toast.error(error.message || 'Failed to resend OTP');
    }
  };

  if (!otpSent) {
    return (
      <form onSubmit={handleSendOTP} className="space-y-6">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 
                rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email to continue"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 
            border border-transparent rounded-full shadow-sm 
            text-sm font-medium text-white bg-primary 
            hover:bg-primary-dark focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300 ease-in-out
            flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            'Continue with Email'
          )}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleVerifyOTP} className="space-y-6">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
          Enter 6-Digit Login Code
        </label>
        <div className="mt-1 relative">
          <input
            id="otp"
            name="otp"
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setOtp(value);
            }}
            className="block w-full px-3 py-2 border border-gray-300 
              rounded-full focus:outline-none focus:ring-2 focus:ring-primary 
              text-center tracking-widest text-lg"
            placeholder="_ _ _ _ _ _"
          />
          {otp.length === 6 && (
            <CheckCircle 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
              text-green-500" 
              size={24} 
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button 
          type="button"
          onClick={handleResendOTP}
          className="text-sm text-primary hover:underline"
        >
          Resend Code
        </button>
        <button 
          type="button"
          onClick={() => setOtpSent(false)}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Change Email
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 
          border border-transparent rounded-full shadow-sm 
          text-sm font-medium text-white bg-primary 
          hover:bg-primary-dark focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-primary
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          'Verify & Continue'
        )}
      </button>
    </form>
  );
}
