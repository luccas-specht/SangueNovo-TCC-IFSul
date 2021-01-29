import React from 'react';

import { FiSun, FiMoon } from 'react-icons/all';

import { useTheme } from '../../../hooks';

import * as SC from './FabIconTheme.style';

export const FabIconTheme = () => {
    const { theme, changeTheme } = useTheme();

    return (
        <SC.Container>
            {theme.title === 'light' ? 
            <FiMoon onClick={changeTheme}/> 
            : 
            <FiSun onClick={changeTheme}/>
            }
        </SC.Container>
    );
};