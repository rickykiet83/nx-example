import { PRODUCTS_FEATURE_KEY, productReducer } from './products.reducer';

import { createFeature } from '@ngrx/store';

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

// export const {
//   name,
//   reducer: productsReducer,

//   selectProductsState,
//   selectProducts,
//   selectStatus,
//   selectError,
// } = productsFeature;
