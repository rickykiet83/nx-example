import { fireEvent, render, screen } from '@testing-library/react';

import ProductsPage from './products-page';
import { Provider } from 'react-redux';
import { cartReducer } from '@nx-example/shared/cart/state';
import { configureStore } from '@reduxjs/toolkit';
import { products } from '@nx-example/shared/product/data';

const renderWithStore = () => {
  const store = configureStore({
    reducer: { cart: cartReducer },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>,
    ),
  };
};

describe('ProductsPage', () => {
  it('renders all products with names', () => {
    renderWithStore();

    products.forEach((p) => {
      expect(screen.getByText(p.name)).toBeDefined();
    });
  });

  it('dispatches addToCart when clicking Add', () => {
    const { store } = renderWithStore();

    const addButtons = screen.getAllByRole('button', { name: /add/i });
    expect(addButtons.length).toBeGreaterThan(0);

    fireEvent.click(addButtons[0]);

    // After one click, cart should have one item
    const state = store.getState();
    expect(Object.values(state.cart.items)[0].quantity).toBe(1);
  });
});
