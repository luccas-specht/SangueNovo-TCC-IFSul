import React from "react";

import { FabTheme } from "../../../components";

import { FormResetPassword } from "../../components";

import * as S from "./resetPassword.style";

export const ResetPassword = () => (
  <S.Container>
    <FabTheme />
    <S.Context>
      <S.AnimationContext>
        <FormResetPassword />
      </S.AnimationContext>
    </S.Context>
  </S.Container>
);
