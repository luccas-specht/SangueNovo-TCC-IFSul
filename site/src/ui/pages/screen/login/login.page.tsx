import React from 'react';

import { FabIconTheme } from '../../../components';
import { FormLogin } from '../components';

import * as SC from './login.style';

export const Login = () => (
  <SC.Container>
    <FabIconTheme/>
    <SC.Context>
      <SC.AnimationContext> 
        <FormLogin />
      </SC.AnimationContext>
    </SC.Context>
  </SC.Container>
);
