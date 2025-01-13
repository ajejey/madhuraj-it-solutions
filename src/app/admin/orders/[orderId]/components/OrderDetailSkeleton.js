export default function OrderDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Order Header Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Order Actions Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="flex gap-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="h-10 w-32 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Customer Information Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index}>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-6 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Information Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="h-4 w-full bg-gray-200 rounded" />
          ))}
        </div>
      </div>

      {/* Order Items Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
        {[1, 2].map((_, index) => (
          <div key={index} className="flex items-center gap-4 mb-4 pb-4 border-b">
            <div className="h-20 w-20 bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-6 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-5 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t flex justify-between">
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-32 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Payment Information Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index}>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-6 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
