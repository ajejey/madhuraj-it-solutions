'use client';

import { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

const BUSINESS_HOURS = [
  { day: 'Monday', hours: '9 am–7 pm' },
  { day: 'Tuesday', hours: '9 am–7 pm' },
  { day: 'Wednesday', hours: '9 am–7 pm' },
  { day: 'Thursday', hours: '9 am–7 pm' },
  { day: 'Friday', hours: '10 am–7 pm' },
  { day: 'Saturday', hours: '10 am–7 pm' },
  { day: 'Sunday', hours: '10 am–5 pm' }
];

export default function BusinessHours() {
  const [currentDay, setCurrentDay] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = days[now.getDay()];
    const currentHours = BUSINESS_HOURS.find(h => h.day === currentDayName);
    
    setCurrentDay(currentDayName);

    // Parse current hours
    const [openTime, closeTime] = currentHours.hours.split('–').map(time => {
      const [hours, period] = time.trim().split(' ');
      const [hour, minute] = hours.split(':').map(Number);
      return period === 'pm' ? hour + 12 : hour;
    });

    // Check current status
    const currentHour = now.getHours();
    if (currentHour >= openTime && currentHour < closeTime) {
      setCurrentStatus('Open Now');
    } else {
      setCurrentStatus('Closed');
    }
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div 
        className="flex items-center gap-5 cursor-pointer group" 
        onClick={toggleExpand}
      >
        <div className="bg-secondary/10 rounded-full w-14 h-14 flex items-center justify-center">
          <Clock className="w-7 h-7 text-secondary group-hover:animate-pulse" />
        </div>
        <div className="flex-grow">
          <p className="text-slate-800 font-semibold text-lg">Business Hours</p>
          <p className="text-slate-600 hover:text-secondary transition-colors text-base">
            {currentStatus} · {currentDay} {BUSINESS_HOURS.find(h => h.day === currentDay)?.hours}
          </p>
        </div>
        <div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-secondary" />
          ) : (
            <ChevronDown className="w-6 h-6 text-secondary" />
          )}
        </div>
      </div>

      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="pl-[4.5rem] border-l-2 border-secondary/20 space-y-2">
          {BUSINESS_HOURS.map((day) => (
            <div 
              key={day.day} 
              className={`flex justify-between pr-4 transition-colors ${
                day.day === currentDay 
                  ? 'font-semibold text-secondary' 
                  : 'text-slate-700'
              }`}
            >
              <span>{day.day}</span>
              <span>{day.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
