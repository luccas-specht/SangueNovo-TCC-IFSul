import React from 'react';

import { ThemeProvider } from './context/theme.context';

import { RenderRoute } from './routes';

export const App = () => (
    <ThemeProvider>
     <RenderRoute />
   </ThemeProvider>
);