import { useContext } from 'react';
import { ThemeContext } from '../../context/theme.context';

 const useTheme = () => {
  const context = useContext<any>(ThemeContext);
  
  if(!context){
      throw new Error('"ThemeContext" deve ser utilizado com o "ThemeProvider"');
  } 
  return context;
}
  export{ useTheme };