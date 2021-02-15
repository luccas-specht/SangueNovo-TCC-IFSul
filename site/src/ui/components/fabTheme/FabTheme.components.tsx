import React from 'react';

import { useTheme } from '../../../hooks';

import * as S from './FabTheme.style';

export const FabTheme = () => {
    const { theme, changeTheme } = useTheme();
    return (
        <S.Container>
            {theme.title === 'light' ? (
            <button type='button' onClick={changeTheme}>
              <S.StyledFaMoon />
            </button>
            ) : (
            <button 
              type='button' onClick={changeTheme}>
              <S.StyledFiSun/>
            </button>)}
        </S.Container>
    );
};