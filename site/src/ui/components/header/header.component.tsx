import React  from 'react';
import * as SC from './header.style';

import { useTheme } from '../../../hooks';

const Header = ({handle}: any) => {
    const { theme, changeTheme } = useTheme();
    return(
        <>
        <SC.Container>
         oi
        </SC.Container>
        <button onClick={changeTheme}>
            clique para ir para o tema {theme.title === 'light' ? 'dark' : 'light'}
        </button>
        </>
    );
};

export { Header };