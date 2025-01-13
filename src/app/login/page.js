'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import LoginForm from './components/LoginForm';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Login to Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive a one-time login code
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}
