import { createReducer, on } from '@ngrx/store';

import { Product } from '@nx-example/shared/product/types';
import { productsActions } from './products.actions';

export type ProductsStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface ProductsState {
  status: ProductsStatus;
  products: Product[];
  error: string | null;
}

const initialState: ProductsState = {
  status: 'idle',
  products: [],
  error: null,
};

/** Reducer */
export const productReducer = createReducer(
  initialState,

  on(productsActions.load, (state) => ({ ...state, status: 'loading', error: null })),

  on(productsActions.loadSuccess, (state, { products }) => ({
    ...state,
    status: 'loaded',
    products,
  })),

  on(productsActions.loadFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  }))
);
