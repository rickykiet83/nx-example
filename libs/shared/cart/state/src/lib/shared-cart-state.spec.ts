import { sharedCartState } from './shared-cart-state';

describe('sharedCartState', () => {
  it('should work', () => {
    expect(sharedCartState()).toEqual('shared-cart-state');
  });
});
