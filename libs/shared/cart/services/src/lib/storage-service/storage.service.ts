import { Product } from '@nx-example/shared/product/types';
import { StorageServiceCore } from '@nx-example/web-core';

export function saveProductToStorage(product: Product, quantity: number = 1) {
  const storageService = new StorageServiceCore();
  const storedCart = storageService.getLocalItem('cart');

  const existingCart: { [productId: string]: number } = storedCart
    ? JSON.parse(storedCart)
    : {};

  existingCart[product.id] = (existingCart[product.id] || 0) + quantity;

  storageService.setLocalItem('cart', JSON.stringify(existingCart));
}

export function removeProductFromStorage(product: Product) {
  const storageService = new StorageServiceCore();
  const storedCart = storageService.getLocalItem('cart');

  const existingCart: { [productId: string]: number } = storedCart
    ? JSON.parse(storedCart)
    : {};

  delete existingCart[product.id];

  storageService.setLocalItem('cart', JSON.stringify(existingCart));
}

export type StoredCart = Record<string, { product: Product; quantity: number }>;

export function getCartFromStorage(): StoredCart {
  const storageService = new StorageServiceCore();
  const storedCart = storageService.getLocalItem('cart');

  try {
    return storedCart ? (JSON.parse(storedCart) as StoredCart) : {};
  } catch {
    return {};
  }
}
