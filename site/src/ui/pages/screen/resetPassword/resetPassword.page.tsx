import React from 'react';

import { FormResetPassword } from '../components';

import * as SC from './resetPassword.style';

import { useTheme } from '../../../../hooks';

export const ResetPassword = () => {
  const { theme } = useTheme();
 
  return(
    <SC.Container>
      <SC.Context>
        <SC.AnimationContext>
          <img 
            src={theme.logo} 
            alt='Logo Sangue Novo'
           />
          <FormResetPassword />
        </SC.AnimationContext>
      </SC.Context>
    </SC.Container>
  );
}