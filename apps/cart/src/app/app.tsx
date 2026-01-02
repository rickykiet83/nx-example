// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import '@nx-example/shared/header';

import { Link, Route, Routes } from 'react-router-dom';

import { CartCartPage } from '@nx-example/cart/cart-page';
import { ProductsPage } from '@nx-example/cart/products-page';

export function App() {
  return (
    <div>
      <nx-example-header title="Cart" />

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartCartPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
