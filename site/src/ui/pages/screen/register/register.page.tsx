import React from 'react';

import { FormRegister } from '../components';

import * as SC from './register.style';

import { useTheme } from '../../../../hooks';

import logoSangueNovoLight from '../../../assets/svg/logo-sangue-novo-light.svg';
import logoSangueNovoDark from '../../../assets/svg/logo-sangue-novo-dark.svg';

const Register = () => {
  const { theme } = useTheme();
  
  return(
    <SC.Container>
      <SC.ImgBackground titleThemeLight={theme.title}/>
      <SC.Context>
        <SC.AnimationContext>
        <img 
          src={theme.title === 'light' ? logoSangueNovoLight: logoSangueNovoDark} 
          alt='Logo Sangue Novo'
         />
          <FormRegister />
        </SC.AnimationContext>
      </SC.Context>
    </SC.Container>
  );
}

export { Register };