
 import React from 'react';

 import { FiSun, FiMoon} from 'react-icons/all';
 
 import { useTheme } from '../../../../../hooks';
 
 import * as SC from './iconChangeTheme.style';
 
 const IconChangeTheme = () => {
    const { theme, changeTheme } = useTheme();
     return (
         <SC.Container>
            {theme.title === 'light' ?  
            <FiMoon onClick={changeTheme}/> :
            <FiSun onClick={changeTheme}/> }
         </SC.Container>
     );
   
 };

 export { IconChangeTheme };
