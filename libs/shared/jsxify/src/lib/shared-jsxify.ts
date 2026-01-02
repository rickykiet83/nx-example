import * as React from 'react';

export type JSXify<T extends HTMLElement> =
  React.DetailedHTMLProps<React.HTMLAttributes<T>, T> &
  Partial<Record<keyof T, unknown>> & {
    ref?: React.Ref<T>;
  };
