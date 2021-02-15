import React from 'react';

import * as S from './inputDatePicker.style';

type Props = {
    id: string;
    icon: React.ReactNode;
    name: string;
    value: string;
    error?: any;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputDatePicker = ({
    id, 
    icon, 
    name, 
    value, 
    placeholder, 
    onChange
}: Props) => {
  return (
    <S.Container >
      {icon}
    <S.Input
      id={id}
      name={name}
      value={value}
      type='date'
      placeholder={placeholder}
      onChange={onChange}
    />
   </S.Container>
  );
};