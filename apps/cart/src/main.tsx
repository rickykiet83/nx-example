import '@nx-example/shared/styles';
import '@nx-example/shared/header';
import '@nx-example/shared/product/ui';
import 'normalize.css/normalize.css';

import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { store } from './app/store';

const basename = process.env.NODE_ENV === 'production' ? '/cart' : '/';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter
        basename={basename}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
