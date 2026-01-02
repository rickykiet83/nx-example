import { fireEvent, render, screen } from '@testing-library/react';

import App from './app';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { cartReducer } from '@nx-example/shared/cart/state';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';

const renderWithProviders = (initialEntries = ['/']) => {
  const store = configureStore({ reducer: { cart: cartReducer } });
  const history = createMemoryHistory({ initialEntries });

  return {
    store,
    history,
    ...render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <App />
        </Router>
      </Provider>,
    ),
  };
};

describe('App', () => {
  it('renders header and navigation links', () => {
    renderWithProviders();
    expect(screen.getByText(/cart/i)).toBeDefined();
    expect(document.querySelector('nx-example-header')).toBeTruthy();
  });

  it('navigates between products and cart routes', () => {
    const { history } = renderWithProviders();

    fireEvent.click(screen.getByRole('link', { name: /cart/i }));
    expect(history.location.pathname).toBe('/cart');

    fireEvent.click(screen.getByRole('link', { name: /products/i }));
    expect(history.location.pathname).toBe('/');
  });
});
