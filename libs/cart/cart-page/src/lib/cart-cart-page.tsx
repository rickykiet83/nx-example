import React, { useMemo } from 'react';
import {
  cartActions,
  selectCartItemsArray,
} from '@nx-example/shared/cart/state';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

const formatAUD = (cents: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(
    cents / 100,
  );

export function CartCartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItemsArray);
  const navigate = useNavigate();

  const totalCents = useMemo(
    () => items.reduce((sum, x) => sum + x.product.price * x.quantity, 0),
    [items],
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-gray-700">Empty cart.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Cart
      </h1>

      <ul className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
        {items.map(({ product, quantity }) => (
          <li
            key={product.id}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            {/* image */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-md bg-gray-100 ring-1 ring-gray-200 sm:h-24 sm:w-24">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>

              {/* title + price (mobile) */}
              <div className="sm:hidden">
                <div className="font-semibold text-gray-900">
                  {product.name}
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  <nx-example-product-price value={product.price} />
                </div>
              </div>
            </div>

            {/* title + price (desktop) */}
            <div className="hidden min-w-0 flex-1 sm:block">
              <div className="truncate font-semibold text-gray-900">
                {product.name}
              </div>
              <div className="mt-1 text-sm text-gray-700">
                <nx-example-product-price value={product.price} />
              </div>
            </div>

            {/* qty + actions */}
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <label className="sr-only" htmlFor={`qty-${product.id}`}>
                Quantity
              </label>

              <select
                id={`qty-${product.id}`}
                value={quantity}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  const diff = next - quantity;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++)
                      dispatch(cartActions.increment(product.id));
                  } else if (diff < 0) {
                    for (let i = 0; i < -diff; i++)
                      dispatch(cartActions.decrement(product.id));
                  }
                }}
                className="
                  h-9 w-20 rounded-md border border-gray-300 bg-white
                  px-2 text-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-indigo-600
                "
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <button
                onClick={() => dispatch(cartActions.removeFromCart(product.id))}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
              >
                Remove
              </button>
            </div>
          </li>
        ))}

        {/* total row */}
        <li className="flex items-center justify-between p-4">
          <span className="text-sm font-medium text-gray-700">Total</span>
          <span className="text-lg font-semibold text-gray-900">
            {formatAUD(totalCents)}
          </span>
        </li>
      </ul>

      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          or{' '}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  );
}

export default CartCartPage;
