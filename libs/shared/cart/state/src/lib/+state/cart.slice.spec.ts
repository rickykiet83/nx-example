import { cartActions, cartReducer, selectCartCount, selectCartItemsArray } from './cart.slice';

const sampleProduct = { id: 'p1', name: 'Test Product', price: 1000 };

describe('cart slice', () => {
  it('initializes with empty cart', () => {
    const state = cartReducer(undefined, { type: 'init' });

    expect(state.items).toEqual({});
  });

  it('adds a product with quantity 1 when not present', () => {
    let state = cartReducer(undefined, { type: 'init' });
    state = cartReducer(state, cartActions.addToCart(sampleProduct));

    expect(state.items['p1']).toEqual({
      product: sampleProduct,
      quantity: 1,
    });
  });

  it('increments quantity when adding an existing product', () => {
    let state = cartReducer(undefined, { type: 'init' });
    state = cartReducer(state, cartActions.addToCart(sampleProduct));
    state = cartReducer(state, cartActions.addToCart(sampleProduct));

    expect(state.items['p1'].quantity).toBe(2);
  });

  it('decrements quantity and removes item when it reaches zero', () => {
    let state = cartReducer(undefined, { type: 'init' });
    state = cartReducer(state, cartActions.addToCart(sampleProduct));
    state = cartReducer(state, cartActions.decrement(sampleProduct.id));

    expect(state.items['p1']).toBeUndefined();
  });

  it('clears the cart', () => {
    let state = cartReducer(undefined, { type: 'init' });
    state = cartReducer(state, cartActions.addToCart(sampleProduct));
    state = cartReducer(state, cartActions.clearCart());

    expect(state.items).toEqual({});
  });

  it('selects items array and total count', () => {
    const state = {
      cart: {
        items: {
          [sampleProduct.id]: { product: sampleProduct, quantity: 2 },
        },
      },
    };

    expect(selectCartItemsArray(state)).toHaveLength(1);
    expect(selectCartCount(state)).toBe(2);
  });
});
