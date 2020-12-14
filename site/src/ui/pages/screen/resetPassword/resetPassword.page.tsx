import React from 'react';

import { FormResetPassword, IconChangeTheme } from '../components';

import * as SC from './resetPassword.style';

import { useTheme } from '../../../../hooks';

const ResetPassword = () => {
  const { theme } = useTheme();
 
  return(
    <SC.Container>
      <SC.Context>
      <IconChangeTheme namePage='resetPassword'/>  
        <SC.AnimationContext>
          <img 
            src={theme.logo} 
            alt='Logo Sangue Novo'
           />
          <FormResetPassword />
        </SC.AnimationContext>
      </SC.Context>
      <SC.ImgBackground/>
    </SC.Container>
  );
}

export { ResetPassword };