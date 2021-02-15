import { useContext } from 'react';

import { AuthContext } from '../../contexts';

export const useAuthenticated = () => {
  const context = useContext<any>(AuthContext);

  if (!context) throw new Error('"ThemeContext" should be used with "AuthContext"');

  return context;
};