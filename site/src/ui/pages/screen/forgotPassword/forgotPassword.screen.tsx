import React from 'react';

import { FormForgotPassword, IconChangeTheme } from '../components';

import * as SC from './forgotPassword.style';

import { useTheme } from '../../../../hooks';

const ForgotPassword = () => {
  const { theme } = useTheme();
  return(
    <SC.Container>
      <SC.Context>
        <IconChangeTheme namePage='forgotPassword'/>
        <SC.AnimationContext>
          <img src={theme.logo} 
            alt='Logo Sangue Novo'
           />
          <FormForgotPassword />
        </SC.AnimationContext>
      </SC.Context>
      <SC.ImgBackground  />
    </SC.Container>
  );
}

export { ForgotPassword };