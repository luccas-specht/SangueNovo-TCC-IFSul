import React from "react";

import clouds from "../../../assets/images/clouds.png";
import thinkingMan from "../../../assets/images/thinking_man.png";
import refreshCard from "../../../assets/images/refresh_card.png";

import { FabTheme } from "../../../components";

import { FormForgotPassword } from "../components";

import * as S from "./forgotPassword.style";

export const ForgotPassword = () => (
  <S.Container>
    <FabTheme />
    <S.Context>
      <S.LeftImg>
        <img src={clouds} alt="nuvens" />
      </S.LeftImg>
      <S.AnimationContext>
        <S.AnimationImg src={refreshCard} alt="atualização de senha" />
        <FormForgotPassword />
      </S.AnimationContext>
      <S.RightImg>
        <S.ContextImg>
          <img src={thinkingMan} alt="homem pensando" />
        </S.ContextImg>
      </S.RightImg>
    </S.Context>
  </S.Container>
);
