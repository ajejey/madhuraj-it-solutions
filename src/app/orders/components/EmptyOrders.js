'use client';

import Link from 'next/link';
import { PackageX } from 'lucide-react';

export default function EmptyOrders() {
  return (
    <div className="text-center py-12">
      <PackageX className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
      <p className="mt-2 text-sm text-gray-500">
        You haven&apos;t placed any orders yet.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  );
}
