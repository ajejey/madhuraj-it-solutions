'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import debounce from 'lodash/debounce';

export default function ProductSearch({ initialSearch = '' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      const params = new URLSearchParams(searchParams);
      
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      
      // Reset to page 1 when search changes
      params.set('page', '1');
      
      router.push(`?${params.toString()}`);
    }, 500),
    [searchParams]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-primary"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
}
