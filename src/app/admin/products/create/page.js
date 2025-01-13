import CreateProductForm from './components/CreateProductForm';

export const metadata = {
  title: 'Create Product | Admin',
  description: 'Add a new product to the inventory'
};

export default function CreateProductPage() {
  return <CreateProductForm />;
}
