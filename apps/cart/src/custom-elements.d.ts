import React from 'react';

type NxHTMLElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

type NxHeaderProps = NxHTMLElement & { title?: string };
type NxPriceProps = NxHTMLElement & { value?: string | number };

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'nx-example-header': NxHeaderProps;
      'nx-example-product-price': NxPriceProps;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'nx-example-header': NxHeaderProps;
      'nx-example-product-price': NxPriceProps;
    }
  }
}

export {};
