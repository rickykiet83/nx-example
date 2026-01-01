import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(baseElement).toBeTruthy();
  });
});
