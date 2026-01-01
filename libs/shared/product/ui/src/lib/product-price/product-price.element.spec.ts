import { registerProductPriceElement } from './product-price.element';

describe('ProductElement', () => {
  beforeAll(() => {
    registerProductPriceElement();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('can be created', () => {
    const el = document.createElement('nx-example-product-price');
    expect(el).toBeTruthy();
  });

  it('displays the price', () => {
    const el = document.createElement('nx-example-product-price') as any;

    // ✅ attach to DOM so connectedCallback runs
    document.body.appendChild(el);

    // set attribute (most reliable)
    el.setAttribute('value', '12345');

    expect(el.textContent).toContain('$123.45');
  });

  it('displays the price via property setter', () => {
    const el = document.createElement('nx-example-product-price') as any;
    document.body.appendChild(el);

    el.value = 12345; // setter -> setAttribute -> attributeChangedCallback -> render

    expect(el.textContent).toContain('$123.45');
  });
});
