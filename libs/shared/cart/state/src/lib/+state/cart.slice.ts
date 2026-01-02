import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { Product } from '@nx-example/shared/product/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: Record<string, CartItem>; // key = product.id
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const p = action.payload;
      const existing = state.items[p.id];
      if (existing) existing.quantity += 1;
      else state.items[p.id] = { product: p, quantity: 1 };
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    increment(state, action: PayloadAction<string>) {
      const item = state.items[action.payload];
      if (item) item.quantity += 1;
    },
    decrement(state, action: PayloadAction<string>) {
      const item = state.items[action.payload];
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) delete state.items[action.payload];
    },
    clearCart(state) {
      state.items = {};
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// selectors
export const selectCartItemsArray = (state: { cart: CartState }) =>
  Object.values(state.cart.items);

export const selectCartCount = (state: { cart: CartState }) =>
  Object.values(state.cart.items).reduce((sum, x) => sum + x.quantity, 0);
