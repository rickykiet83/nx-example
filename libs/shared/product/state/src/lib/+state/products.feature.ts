import { createFeature } from '@ngrx/store';
import { productReducer } from './products.reducer';

/**
 * Feature (NgRx standalone-friendly)
 * - name = feature key
 * - reducer = reducer function
 * - selectors auto-generated
 */
export const productsFeature = createFeature({
  name: 'products',
  reducer: productReducer,
});
