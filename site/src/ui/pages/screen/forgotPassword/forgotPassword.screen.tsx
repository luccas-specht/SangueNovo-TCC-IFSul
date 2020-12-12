import React from 'react';

import { FormForgotPassword } from '../components';

import * as SC from './forgotPassword.style';

import { useTheme } from '../../../../hooks';

import logoSangueNovoLight from '../../../assets/svg/logo-sangue-novo-light.svg';
import logoSangueNovoDark from '../../../assets/svg/logo-sangue-novo-dark.svg';

const ForgotPassword = () => {
  const { theme } = useTheme();
  return(
    <SC.Container>
      <SC.Context>
        <SC.AnimationContext>
          <img src={theme.title === 'light' ? logoSangueNovoLight: logoSangueNovoDark} 
            alt='Logo Sangue Novo' />
  
          <FormForgotPassword />
        </SC.AnimationContext>
      </SC.Context>
      <SC.ImgBackground titleThemeLight={theme.title} />
    </SC.Container>
  );
}

export { ForgotPassword };