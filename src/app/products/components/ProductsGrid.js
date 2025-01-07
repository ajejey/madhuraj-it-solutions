'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Intel Core i7 12700K',
    category: 'Processors',
    brand: 'Intel',
    price: 35999,
    image: '/images/products/intel-i7.webp',
    description: 'High-performance desktop processor with 12 cores and 20 threads'
  },
  {
    id: 2,
    name: 'NVIDIA GeForce RTX 3070',
    category: 'Graphics Cards',
    brand: 'NVIDIA',
    price: 45999,
    image: '/images/products/rtx-3070.jpg',
    description: 'Powerful graphics card for gaming and professional graphics work'
  },
  {
    id: 3,
    name: 'Samsung 970 EVO Plus 1TB SSD',
    category: 'Storage',
    brand: 'Samsung',
    price: 12999,
    image: '/images/products/samsung-ssd.jpg',
    description: 'High-speed NVMe M.2 SSD with excellent read/write performance'
  },
  {
    id: 4,
    name: 'Corsair Vengeance 32GB DDR4',
    category: 'RAM',
    brand: 'Corsair',
    price: 8999,
    image: '/images/products/corsair-ram.jpg',
    description: '32GB (2x16GB) DDR4 3600MHz high-performance memory kit'
  },
  {
    id: 5,
    name: 'ASUS ROG Strix Z690-E Gaming',
    category: 'Motherboards',
    brand: 'ASUS',
    price: 29999,
    image: '/images/products/asus-motherboard.jpg',
    description: 'High-end gaming motherboard with robust power delivery'
  },
  {
    id: 6,
    name: 'Seasonic PRIME TX-1000',
    category: 'Power Supplies',
    brand: 'Seasonic',
    price: 19999,
    image: '/images/products/seasonic-psu.jpg',
    description: '1000W 80 Plus Titanium certified power supply'
  }
];

export default function ProductsGrid() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-lg transition-all group"
        >
          <div className="relative h-48 w-full">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain group-hover:scale-105 transition-transform"
              onError={(e) => {
                console.error('Image load error:', product.image);
                e.target.style.display = 'none';
              }}
            />
            <button 
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <Heart 
                className={`w-5 h-5 ${
                  favorites.includes(product.id) 
                    ? 'text-red-500 fill-current' 
                    : 'text-slate-600'
                }`} 
              />
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col justify-between items-start gap-3 mb-2">
              <h3 className="text-lg font-semibold text-primary">{product.name}</h3>
              <span className="text-slate-600 font-medium">₹{product.price.toLocaleString()}</span>
            </div>
            <p className="text-slate-500 text-sm mb-4">{product.description}</p>
            
            <div className="flex space-x-2">
              <button className="flex-grow bg-primary text-white py-2 rounded-full hover:bg-primary-dark transition flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
