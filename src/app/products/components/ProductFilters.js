'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';

const sortOptions = [
  { label: 'Newest First', value: 'createdAt:desc' },
  { label: 'Price: Low to High', value: 'price:asc' },
  { label: 'Price: High to Low', value: 'price:desc' }
];

const conditions = [
  { label: 'New', value: 'new' },
  { label: 'Refurbished', value: 'refurbished' }
];

export default function ProductFilters({ categories, brands, initialFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Local filter state
  const [filters, setFilters] = useState({
    category: initialFilters.category || '',
    condition: initialFilters.condition || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    brand: initialFilters.brand || '',
    sortBy: initialFilters.sortBy || 'createdAt',
    sortOrder: initialFilters.sortOrder || 'desc'
  });

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Handle sort change
  const handleSortChange = (sortString) => {
    const [sortBy, sortOrder] = sortString.split(':');
    setFilters(prev => ({ ...prev, sortBy, sortOrder }));
  };

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Update search params
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change
    params.set('page', '1');

    // Update URL
    router.push(`?${params.toString()}`);
    setShowMobileFilters(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
      brand: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <label className="text-sm font-medium text-gray-900">Sort By</label>
        <select
          value={`${filters.sortBy}:${filters.sortOrder}`}
          onChange={(e) => handleSortChange(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="text-sm font-medium text-gray-900">Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Brands */}
      <div>
        <label className="text-sm font-medium text-gray-900">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
          className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div>
        <label className="text-sm font-medium text-gray-900">Condition</label>
        <div className="mt-2 space-y-2">
          {conditions.map(({ label, value }) => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="condition"
                value={value}
                checked={filters.condition === value}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="h-4 w-4 text-primary border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium text-gray-900">Price Range</label>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            placeholder="Min"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            placeholder="Max"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={applyFilters}
          className="w-full bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="w-full border border-primary text-primary px-4 py-2 rounded-full hover:bg-primary-light transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block">
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="fixed bottom-4 right-4 z-20 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition"
        >
          <Filter className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}
