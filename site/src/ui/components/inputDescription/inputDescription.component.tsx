import React, { useState, useCallback } from "react";

import { TooltipAlertError } from "../index";

import { GeneralInputProps } from "../../../models";

import * as S from "./inputDescription.style";

export interface TextInputProps extends GeneralInputProps {
  maxLength?: number;
}

export const InputDescription = ({
  id,
  icon,
  name,
  error,
  value,
  maxLength = 300,
  placeholder,
  onChange,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const showError = useCallback(
    () => !!error && <TooltipAlertError messageError={error} />,
    [error]
  );

  return (
    <S.Container isFocused={isFocused} isErrored={!!error}>
      {icon}
      <S.Input
        id={id}
        name={name}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {showError()}
    </S.Container>
  );
};
