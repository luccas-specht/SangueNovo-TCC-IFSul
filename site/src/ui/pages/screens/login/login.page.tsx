import React from 'react';

import clouds from '../../../assets/images/clouds.png';
import navegation from '../../../assets/images/navegation.png';
import superHeroWoman from '../../../assets/images/super_hero_woman.png';

import { FabTheme } from '../../../components';

import { FormLogin } from '../../components';

import * as S from './login.style';

export const Login = () => (
  <S.Container>
    <FabTheme/>
    <S.Context>
      <S.WrapperImg>
        <img src={clouds} alt="nuvens"/>
        <img src={navegation} alt="navegacao"/>
      </S.WrapperImg>
      <S.AnimationContext>
        <FormLogin />
        <S.ImgRight src={superHeroWoman} alt="navegacao"/>
      </S.AnimationContext>
    </S.Context>
  </S.Container>
);
