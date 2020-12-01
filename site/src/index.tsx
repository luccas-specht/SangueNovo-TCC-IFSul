import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ThemeProvider } from 'styled-components';
import { CreateGlobalStyle, theme } from './ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context'

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
     <AuthProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </AuthProvider>
      <CreateGlobalStyle />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);
