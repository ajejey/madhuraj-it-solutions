'use client'

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';

const CATEGORIES = [
  'Electronics', 
  'Computers', 
  'Smartphones', 
  'Accessories', 
  'Refurbished Devices'
];

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [condition, setCondition] = useState(searchParams.get('condition') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleFilter = () => {
    const params = new URLSearchParams();
    
    if (category) params.set('category', category);
    if (condition) params.set('condition', condition);
    if (search) params.set('search', search);
    
    router.push(`/admin/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setCategory('');
    setCondition('');
    setSearch('');
    router.push('/admin/products');
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="w-full md:w-1/3">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-md px-3 py-2 border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md px-3 py-2 border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Condition Filter */}
        <div className="w-full md:w-auto">
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full rounded-md px-3 py-2 border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50"
          >
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="refurbished">Refurbished</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={handleFilter}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
          >
            Apply Filters
          </button>
          
          {(category || condition || search) && (
            <button 
              onClick={resetFilters}
              className="text-red-500 hover:text-red-700 px-4 py-2 rounded-md border border-red-500 hover:border-red-700 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
