import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

document.addEventListener('turbo:load', () => {
  const container = document.getElementById('react-root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  } else {
    console.error('React root container not found!');
  }
});
