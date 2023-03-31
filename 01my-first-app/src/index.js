import React from 'react';
import ReactDOM from 'react-dom/client';
import Hello from './Hello';

const docRoot = document.getElementById('root');
const root = ReactDOM.createRoot(docRoot);

root.render(
  <React.StrictMode>
    <Hello />
  </React.StrictMode>
);
