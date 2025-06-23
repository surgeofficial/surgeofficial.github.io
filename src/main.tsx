import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// GitHub Pages SPA redirect handling
const isRedirected = /\/\?\//.test(window.location.search);
if (isRedirected) {
  const redirect = window.location.search.slice(1).split('&').find(param => param.startsWith('/'));
  if (redirect) {
    const newUrl = redirect.slice(1).replace(/~and~/g, '&');
    window.history.replaceState(null, '', newUrl);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);