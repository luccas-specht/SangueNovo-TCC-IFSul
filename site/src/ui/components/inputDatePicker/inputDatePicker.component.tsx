import { useState, useCallback } from "react";

import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt-BR";

import "react-datepicker/dist/react-datepicker.css";

import { TooltipAlertError } from "../index";

import * as S from "./inputDatePicker.style";

type Props = {
  id: string;
  icon: any;
  name: string;
  value: any;
  error?: any;
  placeholder: string;
  onChange: (e: any) => void;
};

export const InputDatePicker = ({
  id,
  icon,
  name,
  error,
  value,
  placeholder,
  onChange,
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  const handleOpenCalendar = useCallback(
    () => setIsOpenCalendar(!isOpenCalendar ?? false),
    [isOpenCalendar]
  );

  const showError = useCallback(
    () => !!error && <TooltipAlertError messageError={error} />,
    [error]
  );

  registerLocale("pt", pt);

  return (
    <S.Container isFocused={isFocused} isErrored={!!error}>
      <S.Button type="button" onClick={handleOpenCalendar}>
        {icon}
      </S.Button>
      <DatePicker
        locale="pt"
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        minDate={new Date("01/01/1951")}
        id={id}
        name={name}
        selected={value}
        placeholderText={placeholder}
        open={isOpenCalendar}
        onChange={(date) => onChange(date)}
        onClickOutside={handleOpenCalendar}
        onInputClick={handleOpenCalendar}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <S.Content>{showError()}</S.Content>
    </S.Container>
  );
};
