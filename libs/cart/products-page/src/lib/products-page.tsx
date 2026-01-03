import React from 'react';
import { cartActions } from '@nx-example/shared/cart/state';
import { products } from '@nx-example/shared/product/data';
import { useDispatch } from 'react-redux';

export function CartProductsPage() {
  const dispatch = useDispatch();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
      <h2 className="text-xl font-semibold tracking-tight text-slate-100 mb-4">
        Products
      </h2>

      <ul className="flex flex-col gap-3">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4 hover:bg-slate-950/60 transition-colors"
          >
            <a className="shrink-0" href={`/product/${p.id}`}>
              <figure className="m-0 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-center">
                <img
                  className="h-full w-full object-cover"
                  src={p.image}
                  alt={p.name}
                />
              </figure>
            </a>

            <div className="min-w-0 flex-1">
              <strong className="block truncate text-base font-semibold text-slate-100">
                {p.name}
              </strong>
              <p className="mt-1 text-sm text-slate-300">
                <nx-example-product-price
                  value={p.price}
                ></nx-example-product-price>
              </p>
            </div>

            <button
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50 disabled:pointer-events-none transition"
              onClick={() => dispatch(cartActions.addToCart(p))}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartProductsPage;
