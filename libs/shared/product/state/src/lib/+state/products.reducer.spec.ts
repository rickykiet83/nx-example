import { ProductsState, productReducer } from './products.reducer';

import { Action } from '@ngrx/store';

describe('Products Reducer', () => {
  let productsState: ProductsState;

  const mockProducts = [
    {
      id: '0',
      name: 'Product 1',
      price: 10,
      image: '/assets/images/a-game-of-thrones.jpg',
    },
    {
      id: '1',
      name: 'Product 2',
      price: 20,
      image: '/assets/images/a-clash-of-kings.jpg',
    },
  ];

  beforeEach(() => {
    productsState = {
      products: mockProducts,
      status: 'loaded',
      error: null
    };
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as Action;
      const result = productReducer(productsState, action);

      expect(result).toBe(productsState);
    });
  });
});
