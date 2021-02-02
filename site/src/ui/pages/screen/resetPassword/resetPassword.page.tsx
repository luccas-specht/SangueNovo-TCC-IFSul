import React from 'react';

import { FabTheme } from '../../../components';

import { FormResetPassword } from '../components';

import * as SC from './resetPassword.style';

export const ResetPassword = () => (
    <SC.Container>
      <FabTheme/>
      <SC.Context>
        <SC.AnimationContext>
          <FormResetPassword />
        </SC.AnimationContext>
      </SC.Context>
    </SC.Container>
);