'use client'

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  ImageOff 
} from 'lucide-react';
import { deleteProduct } from '../actions';
import { toast } from 'sonner';
import { getFilePreview } from '@/app/lib/storage';

export default function ProductTable({ 
  products, 
  totalPages, 
  currentPage 
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (productId) => {
    startTransition(async () => {
      const result = await deleteProduct(productId);
      
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handlePageChange = (newPage) => {
    router.push(`/admin/products?page=${newPage}`);
  };

  const getProductImageUrl = (imageId) => {
    try {
      return imageId ? getFilePreview(imageId, 50, 50) : '/placeholder-image.png';
    } catch (error) {
      console.error('Image preview error:', error);
      return '/placeholder-image.png';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Condition</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product) => {
              const imageUrl = product.images && product.images.length > 0 
                ? getProductImageUrl(product.images[0]) 
                : '/placeholder-image.png';

              return (
                <tr 
                  key={product.id || product._id} 
                  className="hover:bg-gray-50 transition border-b last:border-b-0"
                >
                  <td className="p-4">
                    <Image 
                      src={imageUrl} 
                      alt={product.name || 'Product Image'} 
                      width={50} 
                      height={50} 
                      className="rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium">{product.name || 'Unnamed Product'}</td>
                  <td className="p-4">₹{product.price ? product.price.toLocaleString() : 'N/A'}</td>
                  <td className="p-4">
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${product.condition === 'new' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                      }
                    `}>
                      {product.condition || 'Unknown'}
                    </span>
                  </td>
                  <td className="p-4">{product.stock || 0}</td>
                  <td className="p-4">
                    <div className="flex justify-center space-x-2">
                      {/* <button 
                        onClick={() => router.push(`/admin/products/${product.id || product._id}`)}
                        className="text-blue-500 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={20} />
                      </button> */}
                      <button 
                        onClick={() => router.push(`/admin/products/edit/${product.id || product._id}`)}
                        className="text-green-500 hover:text-green-700"
                        title="Edit Product"
                      >
                        <Edit size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id || product._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Product"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center p-4 space-x-4">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
