import React from 'react';

import { FabTheme } from '../../../components';

import { FormLogin } from '../components';

import clouds from '../../../assets/images/clouds.png';
import navegation from '../../../assets/images/navegation.png';
import superHeroWoman from '../../../assets/images/super_hero_woman.png';

import * as SC from './login.style';

export const Login = () => (
  <SC.Container>
    <FabTheme/>
    <SC.Context>
      <SC.WrapperImg>
        <img src={clouds} alt="nuvens"/>
        <img src={navegation} alt="navegacao"/>
      </SC.WrapperImg>
      <SC.AnimationContext> 
        <FormLogin />
        <SC.ImgRight src={superHeroWoman} alt="navegacao"/>
      </SC.AnimationContext>
    </SC.Context>
  </SC.Container>
);
