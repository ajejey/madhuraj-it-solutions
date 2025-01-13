import { requireRole } from '@/app/lib/auth';

export default async function CreateProductLayout({ children }) {
  try {
    // Verify admin role
    await requireRole(['admin']);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
        {children}
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Access Denied: Admin privileges required</p>
      </div>
    );
  }
}
