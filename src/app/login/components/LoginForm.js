'use client';

import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { sendLoginOTP } from '../actions';
import { toast } from 'sonner';
import OTPVerification from './OTPVerification';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (e) => {
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

  // Reset to email input state
  const handleChangeEmail = () => {
    setOtpSent(false);
    setEmail('');
  };

  return (
    <div>
      {!otpSent ? (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
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
                'Send Login Code'
              )}
            </button>
          </div>
        </form>
      ) : (
        <OTPVerification 
          email={email} 
          onChangeEmail={handleChangeEmail} 
        />
      )}
    </div>
  );
}
