'use client';

import { PackageX } from 'lucide-react';

export default function EmptyOrders() {
  return (
    <div className="text-center py-12">
      <PackageX className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
      <p className="mt-2 text-sm text-gray-500">
        There are currently no orders in the system.
      </p>
    </div>
  );
}
