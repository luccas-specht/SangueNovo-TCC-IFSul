import React from 'react';

import { useTheme } from '../../../hooks';

import * as SC from './FabTheme.style';

export const FabTheme = () => {
    const { theme, changeTheme } = useTheme();

    return (
        <SC.Container>
            {theme.title === 'light' ? (
            <button onClick={changeTheme}>
              <SC.StyledFaMoon />
            </button>
            ) : (
            <button onClick={changeTheme}>
              <SC.StyledFiSun/>
            </button>)}
        </SC.Container>
    );
};