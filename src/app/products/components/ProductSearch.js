'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        </div>
        
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden p-2 bg-primary text-white rounded-full"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="text-slate-600"
              >
                Close
              </button>
            </div>
            {/* Mobile Filter Content */}
          </div>
        </div>
      )}
    </div>
  );
}
