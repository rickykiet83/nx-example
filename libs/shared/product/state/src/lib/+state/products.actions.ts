import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Product } from '@nx-example/shared/product/types';

/** Actions */
export const productsActions = createActionGroup({
  source: 'Products',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ products: Product[] }>(),
    'Load Failure': props<{ error: string }>(),
  },
});
