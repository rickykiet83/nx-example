import { sharedProductState } from './shared-product-state';

describe('sharedProductState', () => {
  it('should work', () => {
    expect(sharedProductState()).toEqual('shared-product-state');
  });
});
