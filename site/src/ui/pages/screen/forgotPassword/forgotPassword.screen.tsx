import React from 'react';

import { FabTheme } from '../../../components';

import { FormForgotPassword } from '../components';

import clouds from '../../../assets/images/clouds.png';
import thinkingMan from '../../../assets/images/thinking_man.png';
import refreshCard from '../../../assets/images/refresh_card1.png';

import * as SC from './forgotPassword.style';

export const ForgotPassword = () => (
    <SC.Container>
      <FabTheme/>
      <SC.Context>
        <SC.LeftImg>
          <img src={clouds} alt="nuvens"/>
        </SC.LeftImg>
        <SC.AnimationContext>
          <SC.AnimationImg src={refreshCard} alt="atualização de senha"/>
          <FormForgotPassword />
        </SC.AnimationContext>
        <SC.RightImg>
          <SC.ContextImg>
            <img src={thinkingMan} alt="homem pensando"/>
          </SC.ContextImg>
      </SC.RightImg>
      </SC.Context>
    </SC.Container>
);