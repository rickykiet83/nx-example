import { saveProductToStorage, removeProductFromStorage } from './storage.service';
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

  describe('saveProductToStorage', () => {
    it('should add product to empty storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(null);

      saveProductToStorage(sampleProduct);

      expect(mockStorageService.getLocalItem).toHaveBeenCalledWith('products');
      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('products', JSON.stringify(['p1']));
    });

    it('should add product to existing storage without duplicates', () => {
      mockStorageService.getLocalItem.mockReturnValue(JSON.stringify(['p2', 'p3']));

      saveProductToStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('products', JSON.stringify(['p2', 'p3', 'p1']));
    });

    it('should not add duplicate product to storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(JSON.stringify(['p1', 'p2']));

      saveProductToStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('products', JSON.stringify(['p1', 'p2']));
    });
  });

  describe('removeProductFromStorage', () => {
    it('should remove product from storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(JSON.stringify(['p1', 'p2', 'p3']));

      removeProductFromStorage(sampleProduct);

      expect(mockStorageService.getLocalItem).toHaveBeenCalledWith('products');
      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('products', JSON.stringify(['p2', 'p3']));
    });

    it('should handle removing non-existent product from storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(JSON.stringify(['p2', 'p3']));

      removeProductFromStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('products', JSON.stringify(['p2', 'p3']));
    });

    it('should handle removing product from empty storage', () => {
      mockStorageService.getLocalItem.mockReturnValue(null);

      removeProductFromStorage(sampleProduct);

      expect(mockStorageService.setLocalItem).toHaveBeenCalledWith('products', JSON.stringify([]));
    });
  });
});
