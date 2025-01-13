'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';

const statusOptions = [
  'pending', 
  'processing', 
  'shipped', 
  'delivered', 
  'cancelled', 
  'refunded'
];

export default function OrdersFilter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status === selectedStatus ? '' : status);
  };

  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = () => {
    // TODO: Implement filter application logic
    console.log('Applying filters:', { selectedStatus, dateRange });
  };

  return (
    <div className="mb-6 bg-white rounded-2xl shadow-sm p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Filter Orders</h3>
        <button 
          onClick={handleFilterToggle}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <Filter className="h-5 w-5" />
          <span className="text-sm">Filters</span>
        </button>
      </div>

      {isFilterOpen && (
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Order Status</p>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 py-1 text-xs rounded-full capitalize 
                    ${selectedStatus === status 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
