import React, { useState, useCallback } from "react";

import { TooltipAlertError } from "../index";

import * as S from "./inputPassword.style";

type Props = {
  id: string;
  icon: React.ReactNode;
  name: string;
  value: string;
  error?: string | false;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputPassword = ({
  id,
  icon,
  name,
  error,
  value,
  placeholder,
  onChange,
}: Props) => {
  const [type, setType] = useState<"text" | "password">("password");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChangeType = useCallback(() => {
    setType(type === "text" ? "password" : "text");
  }, [type]);

  const renderedIcon = useCallback(() => {
    return type === "text" ? <S.CloseEye /> : <S.OpenEye />;
  }, [type]);

  const showError = useCallback(() => {
    return !!error && <TooltipAlertError messageError={error} />;
  }, [error]);

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
      <button type="button" onClick={handleChangeType}>
        {renderedIcon()}
      </button>
      {showError()}
    </S.Container>
  );
};
