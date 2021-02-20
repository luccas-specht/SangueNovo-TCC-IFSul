import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { AuthProvider } from './contexts';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </>,
  document.getElementById('root')
);

reportWebVitals();
