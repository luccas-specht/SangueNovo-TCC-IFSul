
 import React from 'react';

 import { FaSun, FaMoon} from 'react-icons/fa';
 
 import { useTheme } from '../../../../../hooks';
 
 import * as SC from './iconChangeTheme.style';
 
 const IconChangeTheme = () => {
    const { theme, changeTheme } = useTheme();
     return (
         <SC.Container>
            {theme.title === 'light' ?  
            <FaMoon onClick={changeTheme}/> :
            <FaSun onClick={changeTheme}/> }
         </SC.Container>
     );
   
 };

 export { IconChangeTheme };
