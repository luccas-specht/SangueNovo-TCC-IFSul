import React from 'react';

import { ThemeProvider } from './context/theme.context';

import { RenderedRoute } from './routes';

const App = () => (
    <ThemeProvider>
     <RenderedRoute />
   </ThemeProvider>
);

export { App };
