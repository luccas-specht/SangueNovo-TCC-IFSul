import React from 'react';

import { FormForgotPassword } from '../components';

import * as SC from './forgotPassword.style';

import { useTheme } from '../../../../hooks';

export const ForgotPassword = () => {
  const { theme } = useTheme();
  return(
    <SC.Container>
      <SC.Context>
        <SC.AnimationContext>
          <img src={theme.logo} 
            alt='Logo Sangue Novo'
           />
          <FormForgotPassword />
        </SC.AnimationContext>
      </SC.Context>
    </SC.Container>
  );
};