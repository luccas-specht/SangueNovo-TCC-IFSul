import React from 'react';

import { FormLogin } from '../components';

import * as SC from './login.style';

import { useTheme } from '../../../../hooks';

import logoSangueNovoLight from '../../../assets/svg/logo-sangue-novo-light.svg';
import logoSangueNovoDark from '../../../assets/svg/logo-sangue-novo-dark.svg';

const Login = () => {
  const { theme } = useTheme();
  return(
    <SC.Container>
      <SC.Context>
        <SC.AnimationContext>
          <img src={theme.title === 'light' ? logoSangueNovoLight: logoSangueNovoDark} 
            alt='Logo Sangue Novo' />
  
          <FormLogin />
        </SC.AnimationContext>
      </SC.Context>
      <SC.ImgBackground titleThemeLight={theme.title} />
    </SC.Container>
  );
}

export { Login };