// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import { Link, Route, Routes } from 'react-router-dom';

import { CartCartPage } from '@nx-example/cart/cart-page';
import { CartProductsPage } from '@nx-example/cart/products-page';

export function App() {
  return (
    <div>
      <nx-example-header title="Cart" />

      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <Link to="/products">Products</Link> | <Link to="/">Cart</Link>
      </header>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<CartCartPage />} />
          <Route path="/products" element={<CartProductsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
