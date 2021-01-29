
 import React from 'react';

 import { FiSun, FiMoon} from 'react-icons/all';
 
 import { useTheme } from '../../../../../hooks';
 
 import * as SC from './iconChangeTheme.style';
 interface IconChangeThemeProps {
    namePage: 'login' | 'register' | 'forgotPassword' | 'resetPassword';
 }
 
 export const IconChangeTheme = ({ namePage }: IconChangeThemeProps) => {
    const { theme, changeTheme } = useTheme();
    
    return (
         <SC.Container namePage={namePage}>
            {theme.title === 'light' ?  
            <FiMoon onClick={changeTheme}/> :
            <FiSun onClick={changeTheme}/> }
         </SC.Container>
     );   
 };
