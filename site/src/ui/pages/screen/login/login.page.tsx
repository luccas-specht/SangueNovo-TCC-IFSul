import React from 'react';

import { FormLogin, IconChangeTheme } from '../components';

import * as SC from './login.style';

import { useTheme } from '../../../../hooks';

export const Login = () => {
  const { theme } = useTheme();
 
  return(
    <SC.Container>
      <SC.Context>
      <IconChangeTheme namePage='login'/>  
        <SC.AnimationContext>
          <SC.ContextLogin>
          <img 
            src={theme.logo} 
            alt='Logo Sangue Novo'
           />
          <FormLogin />
          </SC.ContextLogin>
        </SC.AnimationContext>
      </SC.Context>
      <SC.ImgBackground/>
    </SC.Container>
  );
}