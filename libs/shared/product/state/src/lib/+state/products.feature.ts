import { PRODUCTS_FEATURE_KEY, productReducer } from './products.reducer';
import { createFeature, createSelector } from '@ngrx/store';

/**
 * Feature (NgRx standalone-friendly)
 * - name = feature key
 * - reducer = reducer function
 * - selectors auto-generated
 */
export const productsFeature = createFeature({
  name: PRODUCTS_FEATURE_KEY,
  reducer: productReducer,
});

export const selectProductById = (id: string) =>
  createSelector(productsFeature.selectProducts, (products) =>
    products.find(p => p.id === id) ?? null
  );
