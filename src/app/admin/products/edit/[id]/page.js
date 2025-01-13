import { fetchProductById } from '../../actions';
import EditProductForm from './components/EditProductForm';
import { requireRole } from '@/app/lib/auth';

export const metadata = {
  title: 'Edit Product | Admin',
  description: 'Edit an existing product'
};

export default async function EditProductPage({ params }) {
  await requireRole(['admin']);
  
  const product = await fetchProductById(params.id);

  return (
    <div className="space-y-6 pt-6">
      <h1 className="text-3xl font-bold">Edit Product</h1>
      <EditProductForm initialData={product} />
    </div>
  );
}
