import { removeProductFromStorage, saveCartToStorage } from './storage.service';

import { StorageServiceCore } from '@nx-example/web-core';

jest.mock('@nx-example/web-core');

const mockStorageService = {
  getLocalItem: jest.fn(),
  setLocalItem: jest.fn(),
};

const sampleProduct = {
  id: 'p1',
  name: 'Test Product',
  price: 1000,
  image: 'test.jpg',
};

const anotherProduct = {
  id: 'p2',
  name: 'Another Product',
  price: 2000,
  image: 'test-2.jpg',
};

describe('Storage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (StorageServiceCore as jest.Mock).mockImplementation(() => mockStorageService);
  });

  describe('saveCartToStorage', () => {
    it('should add a new product to empty storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(null);

      saveCartToStorage(sampleProduct);

      expect(mockStorageService.getLocalItem).toHaveBeenCalledWith('cart');
      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith(
        'cart',
        JSON.stringify({
          [sampleProduct.id]: { product: sampleProduct, quantity: 1 },
        }),
      );
    });

    it('should increment quantity when product already exists', () => {
      mockStorageService.getLocalItem.mockReturnValue(
        JSON.stringify({
          [sampleProduct.id]: { product: sampleProduct, quantity: 2 },
        }),
      );

      saveCartToStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith(
        'cart',
        JSON.stringify({
          [sampleProduct.id]: { product: sampleProduct, quantity: 3 },
        }),
      );
    });

    it('should respect provided quantity increment', () => {
      mockStorageService.getLocalItem.mockReturnValue(
        JSON.stringify({
          [sampleProduct.id]: { product: sampleProduct, quantity: 1 },
        }),
      );

      saveCartToStorage(sampleProduct, 4);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith(
        'cart',
        JSON.stringify({
          [sampleProduct.id]: { product: sampleProduct, quantity: 5 },
        }),
      );
    });
  });

  describe('removeProductFromStorage', () => {
    it('should remove product from storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(
        JSON.stringify({
          [sampleProduct.id]: { product: sampleProduct, quantity: 1 },
          [anotherProduct.id]: { product: anotherProduct, quantity: 2 },
        }),
      );

      removeProductFromStorage(sampleProduct);

      expect(mockStorageService.getLocalItem).toHaveBeenCalledWith('cart');
      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith(
        'cart',
        JSON.stringify({
          [anotherProduct.id]: { product: anotherProduct, quantity: 2 },
        }),
      );
    });

    it('should handle removing non-existent product from storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(
        JSON.stringify({
          [anotherProduct.id]: { product: anotherProduct, quantity: 2 },
        }),
      );

      removeProductFromStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith(
        'cart',
        JSON.stringify({
          [anotherProduct.id]: { product: anotherProduct, quantity: 2 },
        }),
      );
    });

    it('should handle removing product from empty storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(null);

      removeProductFromStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('cart', JSON.stringify({}));
    });
  });
});
