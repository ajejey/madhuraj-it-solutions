'use client'

import { useState, useEffect } from 'react';
import { getProductCategories } from '../actions';

export default function ProductFilters() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: ''
  });

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

  const applyFilters = () => {
    // Implement filter application logic
    console.log('Applying filters:', {
      category: selectedCategory,
      condition,
      priceRange
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100'
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
        <div className="space-y-2">
          {['new', 'refurbished'].map((conditionOption) => (
            <button
              key={conditionOption}
              onClick={() => handleConditionChange(conditionOption)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                condition === conditionOption 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100'
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
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => handlePriceRangeChange('min', e.target.value)}
            className="w-full rounded-md border-gray-300 px-3 py-2"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => handlePriceRangeChange('max', e.target.value)}
            className="w-full rounded-md border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-primary text-white py-2 rounded-full hover:bg-primary-dark transition"
      >
        Apply Filters
      </button>
    </div>
  );
}
