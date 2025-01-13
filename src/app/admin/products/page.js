import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import ProductTable from './components/ProductTable';
import ProductFilter from './components/ProductFilter';
import Link from 'next/link';
import { fetchProducts } from './actions';

export const metadata = {
  title: 'Products | Admin',
  description: 'Manage your product inventory'
};

export default async function AdminProductsPage({ searchParams }) {
  const page = searchParams.page || '1';
  const limit = searchParams.limit || '10';
  const category = searchParams.category || '';
  const condition = searchParams.condition || '';
  const search = searchParams.search || '';

  const productsData = await fetchProducts({
    page: Number(page),
    limit: Number(limit),
    category, 
    condition, 
    search
  });

  return (
    <div className="space-y-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Link 
          href="/admin/products/create" 
          className="flex items-center bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition"
        >
          <Plus className="mr-2" /> Add New Product
        </Link>
      </div>

      {/* Filters at the top */}
      <div className="mb-6">
        <ProductFilter />
      </div>

      {/* Products Table */}
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductTable 
          products={productsData.products} 
          totalPages={productsData.totalPages}
          currentPage={Number(page)}
        />
      </Suspense>
    </div>
  );
}
