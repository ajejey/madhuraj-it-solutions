'use client';

import { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, X } from 'lucide-react';

const BUSINESS_HOURS = [
  { day: 'Monday', hours: '9 am–7 pm' },
  { day: 'Tuesday', hours: '9 am–7 pm' },
  { day: 'Wednesday', hours: '9 am–7 pm' },
  { day: 'Thursday', hours: '9 am–7 pm' },
  { day: 'Friday', hours: '10 am–7 pm' },
  { day: 'Saturday', hours: '10 am–7 pm' },
  { day: 'Sunday', hours: '10 am–5 pm' }
];

export default function BusinessHoursModal({ isOpen, onClose }) {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayName = days[now.getDay()];
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      });
      
      setCurrentDay(currentDayName);
      setCurrentTime(timeString);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Business Hours
          </h2>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{currentDay}, {currentTime}</span>
          </div>
        </div>

        <div className="space-y-4">
          {BUSINESS_HOURS.map((item) => (
            <div 
              key={item.day} 
              className={`flex justify-between p-3 rounded-lg transition-colors ${
                item.day === currentDay 
                  ? 'bg-blue-50 text-blue-800 font-semibold' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{item.day}</span>
              <span>{item.hours}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
            <MapPin className="w-5 h-5" />
            <a 
              href="https://www.google.com/maps/place/MADHURAJ+SYSTEM+SOLUTIONS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors underline"
            >
              View Location
            </a>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Phone className="w-5 h-5" />
            <a 
              href="tel:+917899113311" 
              className="hover:text-blue-600 transition-colors"
            >
              078991 13311
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
