// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';

import { CartCartPage } from '@nx-example/cart/cart-page';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/cart" element={<CartCartPage />} />
      </Routes>
    </>
  );
}

export default App;
