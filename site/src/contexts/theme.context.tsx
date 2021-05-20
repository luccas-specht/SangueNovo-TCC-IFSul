import React, { createContext, useState, useCallback } from "react";

import { DefaultTheme } from "../ui/styles/styled";

import { dark } from "../ui/styles/themes/dark";
import { light } from "../ui/styles/themes/light";

interface ThemeContextProps {
  children: React.ReactNode;
}

interface ThemeContextData {
  theme: DefaultTheme;
  changeTheme(): void;
}

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData
);

export const ThemeProvider = ({ children }: ThemeContextProps) => {
  const [theme, setTheme] = useState<DefaultTheme>(dark);

  const changeTheme = useCallback(
    () => setTheme(theme.title === "dark" ? light : dark),
    [theme]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
