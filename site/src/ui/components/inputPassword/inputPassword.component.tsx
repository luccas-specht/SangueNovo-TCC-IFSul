import { useState, useCallback } from "react";

import { GeneralInputProps } from "../../../models";

import { TooltipAlertError } from "..";

import * as S from "./inputPassword.style";

export const InputPassword = ({
  id,
  icon,
  name,
  error,
  value,
  placeholder,
  onChange,
}: GeneralInputProps) => {
  const [type, setType] = useState<"text" | "password">("password");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChangeType = useCallback(
    () => setType(type === "text" ? "password" : "text"),
    [type]
  );

  const renderedIcon = useCallback(
    () => (
      <button type="button" onClick={handleChangeType}>
        {type === "text" ? <S.OpenEye /> : <S.CloseEye />}
      </button>
    ),
    [type, handleChangeType]
  );

  const showError = useCallback(
    () => !!error && <TooltipAlertError messageError={error} />,
    [error]
  );

  return (
    <S.Container isFocused={isFocused} isErrored={!!error}>
      {icon}
      <S.Input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {renderedIcon()}
      {showError()}
    </S.Container>
  );
};
