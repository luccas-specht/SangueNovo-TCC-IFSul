import React, { useCallback } from "react";

import { Link, Redirect } from "react-router-dom";

import Lottie from "react-lottie";

import { useAuthenticated } from "../../../../hooks";

import { Header, Button } from "../../../components";

import animation from "../../../assets/animations/animation_page_not_found.json";

import * as S from "./pageNotFound.style";

export const PageNotFound = () => {
  const { user } = useAuthenticated();

  const onRedirect = useCallback(
    () => !user?.token && <Redirect to="login" />,
    [user?.token]
  );

  return (
    <>
      {onRedirect()}
      <Header />
      <S.Container>
        <S.Content>
          <S.AnimationWrapper>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animation,
              }}
              width={600}
              height={600}
            />
          </S.AnimationWrapper>
          <S.InfoWrapper>
            <S.StyledText>Esta página não</S.StyledText>
            <S.StyledText>foi encontrada!</S.StyledText>
            <Link to="dashboard">
              <Button type="button" title="Voltar para a home" />
            </Link>
          </S.InfoWrapper>
        </S.Content>
      </S.Container>
    </>
  );
};
