import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
        <p className="text-gray-600">Loading product creation form...</p>
      </div>
    </div>
  );
}
