import '@nx-example/shared/styles'; // nếu shared-styles export scss entry
import '@nx-example/shared/header'; // hoặc đường dẫn đúng tới scss
import 'normalize.css/normalize.css'; // nếu anh muốn normalize

import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { store } from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
