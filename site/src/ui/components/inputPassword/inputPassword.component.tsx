import React, { useState, useCallback } from 'react';

import { MdRemoveRedEye, BsFillEyeSlashFill } from 'react-icons/all';

import * as S from './inputPassword.style';

type Props = {
    id: string;
    icon: React.ReactNode;
    name: string;
    value: string;
    error?: any;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword = ({
    id, 
    icon, 
    name, 
    value,
    placeholder, 
    onChange
}: Props) => {
  const [type, setType] = useState<'text'|'password'>('password');

  const handleChangeType = useCallback(() => {
    setType(type === 'text' ? 'password' : 'text');
  }, [type])

  const renderedIcon = useCallback(() => {
     return type === 'text' ? <MdRemoveRedEye/> : <BsFillEyeSlashFill/>
  }, [type])
      
  return (
    <S.Container >
      {icon}
    <S.Input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
    <button type='button' onClick={handleChangeType}>
      {renderedIcon()}
    </button>
   </S.Container>
  );
};