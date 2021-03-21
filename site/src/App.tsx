import React from "react";

import { ThemeProvider } from "./contexts";

import { Router } from "./routes";

export const App = () => (
  <ThemeProvider>
    <Router />
  </ThemeProvider>
);
