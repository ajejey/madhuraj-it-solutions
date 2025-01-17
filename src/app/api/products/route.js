import { NextResponse } from 'next/server';
import { fetchProducts } from '@/app/products/actions';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  try {
    const products = await fetchProducts({
      page: Number(searchParams.get('page')) || 1,
      category: searchParams.get('category'),
      condition: searchParams.get('condition'),
      brand: searchParams.get('brand'),
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      search: searchParams.get('search'),
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: searchParams.get('sortOrder') || 'desc',
      limit: 12
    });

    // Add cache control headers
    const headers = {
      'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    return NextResponse.json(products, { headers });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
