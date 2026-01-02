import React from 'react';
import { cartActions } from '@nx-example/shared/cart/state';
import { products } from '@nx-example/shared/product/data';
import { useDispatch } from 'react-redux';

export function CartProductsPage() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: 12 }}>
            <a href={`/product/${p.id}`}>
              <figure>
                <img src={p.image} />
              </figure>
            </a>
            <strong>{p.name}</strong> - ${(p.price / 100).toFixed(2)}
            <button
              style={{ marginLeft: 12 }}
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
