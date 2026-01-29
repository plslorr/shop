import { Product } from '@/types/product';
import productsData from './products.json';

// Import all product images eagerly
const productImages = import.meta.glob('@/assets/products/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

export const products: Product[] = productsData.map((product) => {
  // Find the image path in the glob results that matches the filename from JSON
  const imageKey = Object.keys(productImages).find((key) => key.endsWith(`/${product.image}`));

  if (!imageKey) {
    console.warn(`Image not found for product: ${product.name} (${product.image})`);
  }

  return {
    ...product,
    image: imageKey ? (productImages[imageKey] as string) : '',
  };
});
