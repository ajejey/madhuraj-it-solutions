export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-8"></div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items Loading Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm animate-pulse"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                  <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Loading Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              </div>
              <div className="h-12 w-full bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
