import { Product } from '@nx-example/shared/product/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type StoredCart = Record<string, { product: Product; quantity: number }>;
