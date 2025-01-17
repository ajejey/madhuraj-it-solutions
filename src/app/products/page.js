import ProductsGrid from './components/ProductsGrid';
import ProductFilters from './components/ProductFilters';
import ProductSearch from './components/ProductSearch';
import { fetchProducts, getProductCategories, getProductBrands } from './actions';

export const metadata = {
  title: 'Products - Madhuraj System Solutions',
  description: 'Browse our range of computer hardware, components, and accessories',
};

export default async function ProductsPage({ searchParams }) {
  // Get initial filters from URL
  const {
    category,
    condition,
    minPrice,
    maxPrice,
    search,
    brand,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1
  } = await searchParams;

  // Fetch initial data
  const initialProducts = await fetchProducts({
    category,
    condition,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    search,
    brand,
    sortBy,
    sortOrder,
    page: Number(page),
    limit: 12
  });

  // Fetch categories and brands for filters
  const [categories, brands] = await Promise.all([
    getProductCategories(),
    getProductBrands()
  ]);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Our Products</h1>
        <p className="text-slate-600 max-w-2xl">
          Discover high-quality computer hardware, components, and accessories. 
          From processors and motherboards to complete systems, we have everything 
          you need for your tech requirements.
        </p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-8">
        {/* Filters Column */}
        <div className="md:col-span-1 hidden md:block">
          <ProductFilters 
            categories={categories}
            brands={brands}
            initialFilters={{
              category,
              condition,
              minPrice,
              maxPrice,
              brand,
              sortBy,
              sortOrder
            }}
          />
        </div>
        
        {/* Main Content Column */}
        <div className="md:col-span-3">
          <ProductSearch initialSearch={search} />
          <ProductsGrid 
            initialProducts={initialProducts}
            currentPage={Number(page)}
          />
        </div>
      </div>
    </div>
  );
}
