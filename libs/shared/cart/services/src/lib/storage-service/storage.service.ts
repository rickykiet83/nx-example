import { Product } from '@nx-example/shared/product/types';
import { StorageServiceCore } from '@nx-example/web-core';
import { StoredCart } from '@nx-example/shared/cart/types';

let storageServiceInstance: StorageServiceCore | null = null;

function getStorageService() {
  if (!storageServiceInstance) {
    storageServiceInstance = new StorageServiceCore();
  }
  return storageServiceInstance;
}

export function saveCartToStorage(product: Product, quantity = 1) {
  const storageService = getStorageService();
  const storedCart = storageService.getLocalItem('cart');

  const existingCart: StoredCart = storedCart
    ? JSON.parse(storedCart)
    : {};

  existingCart[product.id] = { product, quantity: (existingCart[product.id]?.quantity || 0) + quantity };

  storageService.setLocalItem('cart', JSON.stringify(existingCart));
}

export function removeProductFromStorage(product: Product) {
  const storageService = getStorageService();
  const storedCart = storageService.getLocalItem('cart');

  const existingCart: StoredCart = storedCart
    ? JSON.parse(storedCart)
    : {};

  delete existingCart[product.id];

  storageService.setLocalItem('cart', JSON.stringify(existingCart));
}

export function getCartFromStorage(): StoredCart {
  const storageService = getStorageService();
  const storedCart = storageService.getLocalItem('cart');

  try {
    return storedCart ? (JSON.parse(storedCart) as StoredCart) : {};
  } catch {
    return {};
  }
}

export function updateCartItemQuantity(product: Product, quantity: number) {
  const storageService = getStorageService();
  const storedCart = storageService.getLocalItem('cart');

  const existingCart: StoredCart = storedCart
    ? JSON.parse(storedCart)
    : {};

  if (quantity <= 0) {
    delete existingCart[product.id];
  } else {
    existingCart[product.id] = { product, quantity };
  }

  storageService.setLocalItem('cart', JSON.stringify(existingCart));
}
