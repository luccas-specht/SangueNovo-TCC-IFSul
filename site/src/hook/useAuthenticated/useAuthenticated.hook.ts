import { useContext } from 'react';

import { AuthContext } from '../../context';

export const useAuthenticated = () => {
  const context = useContext<any>(AuthContext);
  
  if(!context) throw new Error('"ThemeContext" should be used with "AuthContext"');
  
  return context;
};