import { Product } from '@nx-example/shared/product/types';
import { StorageServiceCore } from '@nx-example/web-core';

export function saveProductToStorage(product: Product) {
  const storageService = new StorageServiceCore();
  const storedProducts = storageService.getLocalItem('products');

  const existingProducts: string[] = storedProducts
    ? JSON.parse(storedProducts)
    : [];

  if (!existingProducts.includes(product.id)) {
    existingProducts.push(product.id);
  }

  storageService.setLocalItem('products', JSON.stringify(existingProducts));
}

export function removeProductFromStorage(product: Product) {
  const storageService = new StorageServiceCore();
  const storedProducts = storageService.getLocalItem('products');

  const existingProducts: string[] = storedProducts
    ? JSON.parse(storedProducts)
    : [];

  const filteredProducts = existingProducts.filter(id => id !== product.id);

  storageService.setLocalItem('products', JSON.stringify(filteredProducts));
}
