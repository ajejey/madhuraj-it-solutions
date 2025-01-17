'use client'

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateProduct } from '../../../actions';
import ProductForm from '../../../create/components/CreateProductForm';

export default function EditProductForm({ initialData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData) => {
    startTransition(async () => {
      try {
        const result = await updateProduct(initialData.id, formData);
        
        if (result.success) {
          toast.success('Product updated successfully');
          router.push('/admin/products');
          router.refresh();
        } else {
          toast.error(result.message || 'Failed to update product');
        }
      } catch (error) {
        toast.error('An unexpected error occurred');
        console.error(error);
      }
    });
  };

  return (
    <ProductForm 
      initialData={initialData}
      onSubmit={handleSubmit}
      isEditing={true}
      isLoading={isPending}
    />
  );
}
