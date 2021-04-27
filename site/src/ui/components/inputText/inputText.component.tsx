import React, { useState, useCallback } from "react";

import { TooltipAlertError } from "../index";

import { GeneralInputProps } from "../../../models";

import * as S from "./inputText.style";

export interface TextInputProps extends GeneralInputProps {
  maxLength?: number;
}

export const InputText = ({
  id,
  icon,
  name,
  error,
  value,
  maxLength = 50,
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
        type="text"
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
