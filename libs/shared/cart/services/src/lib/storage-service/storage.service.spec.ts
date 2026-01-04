import { removeProductFromStorage, saveProductToStorage } from './storage.service';

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
  image: 'test.jpg'
};

describe('Storage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (StorageServiceCore as jest.Mock).mockImplementation(() => mockStorageService);
  });

  fdescribe('saveProductToStorage', () => {
    it('should add product to empty storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(null);

      saveProductToStorage(sampleProduct);

      expect(mockStorageService.getLocalItem).toHaveBeenCalledWith('cart');
      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('cart', JSON.stringify({ 'p1': 1 }));
    });

    it('should add product to existing storage without duplicates', () => {
      mockStorageService.getLocalItem.mockReturnValue(JSON.stringify({ 'p2': 1, 'p3': 2 }));

      saveProductToStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('cart', JSON.stringify({ 'p2': 1, 'p3': 2, 'p1': 1 }));
    });

    it('should not add duplicate product to storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(JSON.stringify({ 'p1': 1, 'p2': 2 }));

      saveProductToStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('cart', JSON.stringify({ 'p1': 2, 'p2': 2 }));
    });
  });

  describe('removeProductFromStorage', () => {
    it('should remove product from storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(JSON.stringify({ 'p1': 1, 'p2': 2 }));

      removeProductFromStorage(sampleProduct);

      expect(mockStorageService.getLocalItem).toHaveBeenCalledWith('cart');
      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('cart', JSON.stringify({ 'p1': 1, 'p2': 2 }));
    });

    it('should handle removing non-existent product from storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(JSON.stringify({ 'p2': 1, 'p3': 2 }));

      removeProductFromStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('cart', JSON.stringify({ 'p2': 1, 'p3': 2 }));
    });

    it('should handle removing product from empty storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(null);

      removeProductFromStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('cart', JSON.stringify({}));
    });
  });
});
