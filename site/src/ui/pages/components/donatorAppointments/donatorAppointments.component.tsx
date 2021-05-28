import React from "react";

import { WaitingAnimation } from "../waitingAnimation/waitingAnimation.component";

import * as S from "./donatorAppointments.style";

export const DonatorAppointments = () => (
  <S.Container>
    <WaitingAnimation
      message="Sem agendamentos no momento, espere a instituição responsável
      aprovar ou solicite um novo agendamento."
    />
  </S.Container>
);
