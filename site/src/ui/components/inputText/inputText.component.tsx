import React from 'react';

import * as S from './inputText.style';

type PropsInputText = {
    id: string;
    icon: React.ReactNode;
    name: string;
    value: string;
    error?: any;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText = ({
    id, 
    icon,
    name, 
    value, 
    placeholder, 
    onChange
}: PropsInputText) => {
 
  return(
    <S.Container >
       {icon}
       <S.Input
         id={id}
         type='text'
         name={name}
         value={value}
         placeholder={placeholder}
         onChange={onChange}
       />
    </S.Container>
  );
};