// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import { useSelector } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';

import { CartCartPage } from '@nx-example/cart/cart-page';
import { CartProductsPage } from '@nx-example/cart/products-page';
import { selectCartCount } from '@nx-example/shared/cart/state';

export function App() {
  const itemCount = useSelector(selectCartCount);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-slate-900 text-cyan-300 border border-slate-800'
        : 'text-slate-200 hover:text-white hover:bg-slate-900/60 border border-transparent',
    ].join(' ');

  return (
    <div className="min-h-screen text-slate-100">
      <nx-example-header title="Cart" />

      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
          <NavLink to="/" className={navLinkClass} end>
            Products
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs font-semibold text-cyan-200">
                {itemCount}
              </span>
            )}
          </NavLink>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Routes>
          <Route path="/" element={<CartProductsPage />} />
          <Route path="/cart" element={<CartCartPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
