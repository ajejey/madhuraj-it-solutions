'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
  'Processors',
  'Motherboards',
  'RAM',
  'Storage',
  'Graphics Cards',
  'Power Supplies',
  'Cooling Systems'
];

const priceRanges = [
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
  { label: '₹15,000 - ₹30,000', min: 15000, max: 30000 },
  { label: 'Over ₹30,000', min: 30000, max: Infinity }
];

export default function ProductFilters() {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: false,
    brand: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      {/* Category Filter */}
      <div>
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('category')}
        >
          <h3 className="text-lg font-semibold">Categories</h3>
          <ChevronDown 
            className={`transform transition-transform ${
              openSections.category ? 'rotate-180' : ''
            }`} 
          />
        </div>
        {openSections.category && (
          <div className="mt-4 space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="text-primary focus:ring-primary" 
                />
                <span className="text-slate-600">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div>
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          <h3 className="text-lg font-semibold">Price Range</h3>
          <ChevronDown 
            className={`transform transition-transform ${
              openSections.price ? 'rotate-180' : ''
            }`} 
          />
        </div>
        {openSections.price && (
          <div className="mt-4 space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="text-primary focus:ring-primary" 
                />
                <span className="text-slate-600">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div>
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('brand')}
        >
          <h3 className="text-lg font-semibold">Brands</h3>
          <ChevronDown 
            className={`transform transition-transform ${
              openSections.brand ? 'rotate-180' : ''
            }`} 
          />
        </div>
        {openSections.brand && (
          <div className="mt-4 space-y-2">
            {['Intel', 'AMD', 'NVIDIA', 'Corsair', 'Samsung', 'Western Digital'].map((brand) => (
              <label key={brand} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="text-primary focus:ring-primary" 
                />
                <span className="text-slate-600">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
