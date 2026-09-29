import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import Materialize JS for interactive features like Modals, FormSelect, Dropdowns, Toast
import 'materialize-css/dist/js/materialize.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
