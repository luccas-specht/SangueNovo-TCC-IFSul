import React from 'react';

import { FormRegister, IconChangeTheme } from '../components';

import * as SC from './register.style';

import { useTheme } from '../../../../hooks';

const Register = () => {
  const { theme } = useTheme();
  
  return(
    <SC.Container>
      <SC.ImgBackground/>
      <SC.Context>
      <IconChangeTheme namePage='register'/>
        <SC.AnimationContext>
        <img 
          src={theme.logo} 
          alt='Logo Sangue Novo'
        />
          <FormRegister donator={true} />
        </SC.AnimationContext>
      </SC.Context>
    </SC.Container>
  );
}

export { Register };