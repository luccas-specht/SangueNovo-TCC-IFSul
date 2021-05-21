import { useCallback, useMemo } from "react";

import Lottie from "react-lottie";

import animation from "../../assets/animations/animation_loader.json";

import * as S from "./loader.styled";

export const Loader = () => {
  const optionsConfig = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: animation,
    }),
    []
  );

  const renderAnimation = useCallback(
    () => (
      <S.AnimationWrapper>
        <S.Content>
          <Lottie options={optionsConfig} isClickToPauseDisabled />
        </S.Content>
      </S.AnimationWrapper>
    ),
    [optionsConfig]
  );

  return <S.AnimationContent>{renderAnimation()}</S.AnimationContent>;
};
