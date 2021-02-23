import React from "react";

import { ThemeProvider } from "./contexts";

import { RenderRoute } from "./routes";

export const App = () => (
  <ThemeProvider>
    <RenderRoute />
  </ThemeProvider>
);
