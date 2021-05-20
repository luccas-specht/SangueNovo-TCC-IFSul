import React, { ReactChild, useCallback } from "react";

import * as S from "./genericModal.style";

type Props = {
  isOpen: boolean;
  children: ReactChild;
  onClose: () => void;
};

export const GenericModal = ({ isOpen, children, onClose }: Props) => {
  const handleOutSideClick = useCallback(
    (e: any) => {
      if (e.target.id === "modal") onClose();
    },
    [onClose]
  );

  return isOpen ? (
    <S.Modal onClick={handleOutSideClick} id="modal">
      <S.Container>
        <S.CloseButton onClick={onClose} />
        <S.Content>{children}</S.Content>
      </S.Container>
    </S.Modal>
  ) : null;
};
