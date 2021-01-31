import React from 'react';

import { useTheme } from '../../../hooks';

import * as SC from './FabTheme.style';

export const FabTheme = () => {
    const { theme, changeTheme } = useTheme();

    return (
        <SC.Container>
            {theme.title === 'light' ? 
            <SC.StyleFaMoon onClick={changeTheme}/> : 
            <SC.StyleFiSun onClick={changeTheme}/>
            }
        </SC.Container>
    );
};