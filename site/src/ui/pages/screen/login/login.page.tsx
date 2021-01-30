import React from 'react';

import { FabIconTheme } from '../../../components';

import { FormLogin } from '../components';

import clouds from '../../../assets/images/clouds.png';
import navegation from '../../../assets/images/navegation.jpg';
import fuckingWoman from '../../../assets/images/fucking_woman.jpg';

import * as SC from './login.style';

export const Login = () => (
  <SC.Container>
    {/* <FabIconTheme/> */}
    <SC.Context>
      <SC.WrapperImg>
        <img src={clouds} alt="nuvens"/>
        <img src={navegation} alt="navegacao"/>
      </SC.WrapperImg>
      <SC.AnimationContext> 
        <FormLogin />
      </SC.AnimationContext>
      <SC.ColumnRight>
        {/* <img src={fuckingWoman} alt="navegacao"/> */}
      </SC.ColumnRight>
    </SC.Context>
  </SC.Container>
);
