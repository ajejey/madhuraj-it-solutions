import { Users, Search } from 'lucide-react';

export default function UsersLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-sm animate-pulse">
        {/* Search Bar Skeleton */}
        <div className="p-4 border-b flex items-center gap-4">
          <div className="flex-1 relative">
            <div className="w-full h-10 bg-gray-200 rounded-full" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded-full" />
        </div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="px-6 py-3 text-left">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </th>
                <th className="px-6 py-3 text-center">
                  <div className="h-4 w-16 bg-gray-200 rounded mx-auto" />
                </th>
                <th className="px-6 py-3 text-center">
                  <div className="h-4 w-16 bg-gray-200 rounded mx-auto" />
                </th>
                <th className="px-6 py-3 text-center">
                  <div className="h-4 w-16 bg-gray-200 rounded mx-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-48 bg-gray-200 rounded" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="h-6 w-16 bg-gray-200 rounded-full mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <div className="h-8 w-8 bg-gray-200 rounded-full" />
                      <div className="h-8 w-8 bg-gray-200 rounded-full" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="p-4 flex justify-between items-center border-t">
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
