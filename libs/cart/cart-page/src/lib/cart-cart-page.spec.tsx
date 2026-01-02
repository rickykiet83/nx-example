import { fireEvent, render, screen } from '@testing-library/react';

import CartCartPage from './cart-cart-page';
import { Provider } from 'react-redux';
import { cartReducer } from '@nx-example/shared/cart/state';
import { configureStore } from '@reduxjs/toolkit';

const sampleProduct = {
  id: 'p1',
  name: 'Product 1',
  price: 12345,
  image: '/assets/p1.jpg',
};

const renderWithStore = (preloadedCartState = {}) => {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: {
      cart: {
        items: {
          [sampleProduct.id]: {
            product: sampleProduct,
            quantity: 2,
          },
        },
        ...preloadedCartState,
      },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <CartCartPage />
      </Provider>,
    ),
  };
};

describe('CartCartPage', () => {
  it('shows empty state when no items', () => {
    renderWithStore({ items: {} });
    expect(screen.getByText(/empty cart/i)).toBeDefined();
  });

  it('renders cart items and total', () => {
    renderWithStore();

    expect(screen.getByText(sampleProduct.name)).toBeDefined();
    expect(screen.getByRole('heading', { name: /total/i })).toBeDefined();
    expect(screen.getByText('$246.90')).toBeDefined(); // 2 * 12345 cents -> $246.90
  });

  it('removes an item when clicking Remove', () => {
    const { store } = renderWithStore();

    fireEvent.click(screen.getByRole('button', { name: /remove/i }));

    expect(Object.keys(store.getState().cart.items)).toHaveLength(0);
  });

  it('changes quantity via select and updates store', () => {
    const { store } = renderWithStore();

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: '3' } });

    expect(store.getState().cart.items[sampleProduct.id].quantity).toBe(3);
  });
});
