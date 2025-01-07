export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-24 animate-pulse">
      <div className="mb-12">
        <div className="h-12 bg-gray-300 mb-4 w-3/4"></div>
        <div className="h-4 bg-gray-300 mb-2 w-full"></div>
        <div className="h-4 bg-gray-300 mb-2 w-5/6"></div>
      </div>
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 hidden md:block">
          <div className="bg-gray-300 h-96 rounded-2xl"></div>
        </div>
        
        <div className="md:col-span-3">
          <div className="h-12 bg-gray-300 mb-8 rounded-full"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-300 h-80 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
