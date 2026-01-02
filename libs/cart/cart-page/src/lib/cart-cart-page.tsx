import React, { useMemo } from 'react';
import {
  cartActions,
  selectCartItemsArray,
} from '@nx-example/shared/cart/state';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

// ✅ Styles anh đưa
const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 900px;
  padding: 10px;

  @media screen and (max-width: 900px) {
    max-width: 100%;
  }
`;

const StyledLi = styled.li`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  padding: 10px;

  figure {
    flex-shrink: 0;
    height: 125px;
    width: 125px;
    justify-content: center;
    display: flex;
    margin: 0;
  }

  select {
    width: 50px;
    margin: 0 20px;
  }

  .title {
    flex-grow: 1;
    margin-left: 50px;
  }

  @media screen and (max-width: 900px) {
    figure {
      width: 50px;
      height: 50px;
    }

    .title {
      margin-left: 1em;
    }
  }
`;

const StyledTotalLi = styled.li`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  padding: 10px;

  h2 {
    flex-grow: 1;
    margin-left: 175px;
  }
`;

const formatAUD = (cents: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(
    cents / 100,
  );

export function CartCartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItemsArray);

  const totalCents = useMemo(
    () => items.reduce((sum, x) => sum + x.product.price * x.quantity, 0),
    [items],
  );

  if (items.length === 0) {
    return (
      <p style={{ maxWidth: 900, margin: '24px auto', padding: 10 }}>
        Empty cart.
      </p>
    );
  }

  return (
    <StyledUl>
      {items.map(({ product, quantity }) => (
        <StyledLi key={product.id}>
          <figure>
            {/* nếu anh có ảnh */}
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : null}
          </figure>

          <div className="title">
            <strong>{product.name}</strong>
            <div>
              <nx-example-product-price
                value={product.price}
              ></nx-example-product-price>
            </div>
          </div>

          {/* quantity selector để match CSS select */}
          <select
            value={quantity}
            onChange={(e) => {
              const next = Number(e.target.value);
              // đơn giản: set bằng cách tăng/giảm chênh lệch
              // (nếu anh có action setQuantity thì dùng setQuantity)
              const diff = next - quantity;
              if (diff > 0) {
                for (let i = 0; i < diff; i++)
                  dispatch(cartActions.increment(product.id));
              } else if (diff < 0) {
                for (let i = 0; i < -diff; i++)
                  dispatch(cartActions.decrement(product.id));
              }
            }}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <button
            onClick={() => dispatch(cartActions.removeFromCart(product.id))}
          >
            Remove
          </button>
        </StyledLi>
      ))}

      {/* ✅ Total row */}
      <StyledTotalLi>
        <h2>Total</h2>
        <h2>{formatAUD(totalCents)}</h2>
      </StyledTotalLi>
    </StyledUl>
  );
}
