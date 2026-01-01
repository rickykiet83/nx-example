import { render } from '@testing-library/react';

import CartCartPage from './cart-cart-page';

describe('CartCartPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartCartPage />);
    expect(baseElement).toBeTruthy();
  });
});
