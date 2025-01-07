import ProductsGrid from './components/ProductsGrid';
import ProductFilters from './components/ProductFilters';
import ProductSearch from './components/ProductSearch';

export const metadata = {
  title: 'Products - Madhuraj System Solutions',
  description: 'Browse our range of computer hardware, components, and accessories',
};

export default function ProductsPage() {
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
          <ProductFilters />
        </div>
        
        {/* Main Content Column */}
        <div className="md:col-span-3">
          <ProductSearch />
          <ProductsGrid />
        </div>
      </div>
    </div>
  );
}
