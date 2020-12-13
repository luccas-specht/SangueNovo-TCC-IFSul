
 import React from 'react';

 import { FiSun, FiMoon} from 'react-icons/all';
 
 import { useTheme } from '../../../../../hooks';
 
 import * as SC from './iconChangeTheme.style';
 interface IconChangeTheme {
    namePage: 'login' | 'register' | 'forgotPassword';
 }
 
 const IconChangeTheme = ({ namePage }: IconChangeTheme) => {
    const { theme, changeTheme } = useTheme();
     
    return (
         <SC.Container namePage={namePage}>
            {theme.title === 'light' ?  
            <FiMoon onClick={changeTheme}/> :
            <FiSun onClick={changeTheme}/> }
         </SC.Container>
     );
   
 };

 export { IconChangeTheme };
