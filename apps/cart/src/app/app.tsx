// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import '@nx-example/shared/header';

import { Link, Route, Routes } from 'react-router-dom';

import { CartCartPage } from '@nx-example/cart/cart-page';
import { CartProductsPage } from '@nx-example/cart/products-page';

export function App() {
  return (
    <div>
      <nx-example-header title="Cart" />

      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <Link to="/">Products</Link> | <Link to="/cart">Cart</Link>
      </header>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<CartProductsPage />} />
          <Route path="/cart" element={<CartCartPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
