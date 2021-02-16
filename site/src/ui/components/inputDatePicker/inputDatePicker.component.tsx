import React, { 
  useState, 
  useCallback
} from 'react';

import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';

import "react-datepicker/dist/react-datepicker.css";

import * as S from './inputDatePicker.style';

type Props = {
    id: string;
    icon: any;
    name: string;
    value: Date;
    error?: any;
    placeholder?: string;
    onChange: (e: any) => void
}

export const InputDatePicker = ({
    id, 
    icon, 
    name, 
    value,
    onChange
}: Props) => {
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  const handleOpenCalendar = useCallback(() => {
    setIsOpenCalendar(!isOpenCalendar ?? false)
  }, [isOpenCalendar]);

  registerLocale('pt', pt);

  return (
    <S.Container>
      <S.Button type='button' onClick={handleOpenCalendar}>
        {icon}
      </S.Button>
      <DatePicker
        id={id}
        name={name}
        selected={value}
        onChange={date => onChange(date)}
        open={isOpenCalendar}
        locale='pt'
        dateFormat='dd/MM/yyyy'
        maxDate={new Date()}
        minDate={new Date('01/01/1900')}
      />
   </S.Container>
  );
};