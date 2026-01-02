// A tiny Web Component for displaying price in cents as $xx.xx (or $xx)
export class ProductPriceElement extends HTMLElement {
  static readonly tagName = 'nx-example-product-price';
  static readonly observedAttributes = ['value'];

  private get valueCents(): number {
    const raw = this.getAttribute('value') ?? '0';
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  }

  private formatAUD(cents: number): string {
    // If your prices are stored in cents (10000 => $100.00)
    const dollars = cents / 100;

    // Use Intl for proper formatting. Change currency if needed.
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 2,
    }).format(dollars);
  }

  /** Allow property binding: <nx-example-product-price .value="10000"> */
  set value(cents: number) {
    this.setAttribute('value', String(cents));
  }

  get value(): number {
    return this.valueCents;
  }

  connectedCallback(): void {
    // Render once when attached
    this.render();
  }

  attributeChangedCallback(): void {
    // Re-render when 'value' changes
    this.render();
  }

  private render(): void {
    this.textContent = this.formatAUD(this.valueCents);
  }
}

// Register only once (important for HMR / tests)
export function registerProductPriceElement(): void {
  if (!customElements.get(ProductPriceElement.tagName)) {
    customElements.define(ProductPriceElement.tagName, ProductPriceElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nx-example-product-price': ProductPriceElement;
  }
}
