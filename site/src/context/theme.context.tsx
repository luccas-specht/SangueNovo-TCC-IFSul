import React, { createContext, useState, useCallback } from 'react';
import { DefaultTheme } from '../styles/styled';

import { dark } from '../styles/themes/dark';
import { light } from '../styles/themes/light';

interface ThemeContextProps  { 
  children: React.ReactNode
}

interface ThemeContextData {
  theme: DefaultTheme
  changeTheme(): void;
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider = ({ children }: ThemeContextProps) => {
  const [theme, setTheme] = useState<DefaultTheme>(light);

  const changeTheme = useCallback(() => {
    setTheme(theme.title === 'dark' ? light : dark);
  }, [theme]);

 
  return (
    <ThemeContext.Provider value={{
         theme, 
         changeTheme
     }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };