import { User, MapPin, ShoppingBag } from 'lucide-react';

export default function UserDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8 animate-pulse">
        {/* User Profile Skeleton */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
            <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-36 bg-gray-200 rounded mb-4" />
            
            <div className="w-full space-y-3">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full" />
                  <div className="flex-1 flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Addresses Skeleton */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="h-5 w-5 mr-2 bg-gray-200 rounded-full" />
            <div className="h-6 w-36 bg-gray-200 rounded" />
          </div>
          {[1, 2].map((_, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div className="h-4 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-36 bg-gray-200 rounded mb-1" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Recent Orders Skeleton */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="h-5 w-5 mr-2 bg-gray-200 rounded-full" />
            <div className="h-6 w-36 bg-gray-200 rounded" />
          </div>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
