import React from "react";

import { FiClock } from "react-icons/fi";

import imageUserDefault from "../../assets/images/default_user_image.png";

import * as S from "./appointmentCard.style";

type Props = {
  isNextAppointment?: boolean;
  image: string | null | undefined;
  name: string;
  time?: any;
};

export const AppointmentCard = ({
  isNextAppointment = false,
  name,
  image,
  time,
}: Props) => {
  return (
    <S.Container isNextAppointment={isNextAppointment}>
      <img src={image ?? imageUserDefault} alt={name} />
      <strong>{name}</strong>
      <span>
        <FiClock />
        {time}
      </span>
    </S.Container>
  );
};
