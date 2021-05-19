import React, { useCallback, useMemo } from "react";

import Lottie from "react-lottie";

import animation from "../../../assets/animations/animation_waiting_approve_campaign.json";

import * as S from "./waitingAnimation.style";

interface Props {
  message: string;
}

export const WaitingAnimation = ({ message }: Props) => {
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
        <Lottie options={optionsConfig} isClickToPauseDisabled />
      </S.AnimationWrapper>
    ),
    [optionsConfig]
  );

  return (
    <S.AnimationContent>
      {renderAnimation()}
      <S.TextInfo>{message}</S.TextInfo>
    </S.AnimationContent>
  );
};
