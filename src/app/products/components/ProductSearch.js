'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { getProductCategories } from '../actions';

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Mobile Filter State
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: ''
  });

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getProductCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    fetchCategories();
  }, []);

  // Mobile Filter Handlers
  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleConditionChange = (selectedCondition) => {
    setCondition(selectedCondition === condition ? '' : selectedCondition);
  };

  const handlePriceRangeChange = (field, value) => {
    setPriceRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyMobileFilters = () => {
    // TODO: Implement filter application logic
    console.log('Applying mobile filters:', {
      category: selectedCategory,
      condition,
      priceRange
    });
    setShowMobileFilters(false);
  };

  const resetMobileFilters = () => {
    setSelectedCategory('');
    setCondition('');
    setPriceRange({ min: '', max: '' });
  };

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
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Filter Content */}
            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full transition-colors text-sm ${
                        selectedCategory === category 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Condition</h3>
                <div className="flex space-x-2">
                  {['new', 'refurbished'].map((conditionOption) => (
                    <button
                      key={conditionOption}
                      onClick={() => handleConditionChange(conditionOption)}
                      className={`flex-1 px-4 py-2 rounded-full transition-colors text-sm ${
                        condition === conditionOption 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                      }`}
                    >
                      {conditionOption.charAt(0).toUpperCase() + conditionOption.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-6"
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-500">₹</span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-6"
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-500">₹</span>
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={resetMobileFilters}
                  className="flex-1 bg-gray-100 text-slate-700 py-3 rounded-full hover:bg-gray-200 transition"
                >
                  Reset
                </button>
                <button
                  onClick={applyMobileFilters}
                  className="flex-1 bg-primary text-white py-3 rounded-full hover:bg-primary-dark transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
