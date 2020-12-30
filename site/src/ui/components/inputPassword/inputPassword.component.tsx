import React, { useState, useCallback } from 'react';

import * as SC from './inputPassword.style';
interface PropsInputPassword {
    id: string;
    icon?: any;
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
    error, 
    placeholder, 
    onChange
}: PropsInputPassword) => {
  const [type, setType] = useState<'text'|'password'>('password');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);
    setIsFilled(!!value);
  }, [value]);

  return(
    <SC.Container 
      isFilled={isFilled} 
      isFocus={isFocus} 
      isErrored={!!error}
     >
      {icon}
    <SC.Input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={() => setIsFocus(true)}
      onBlur={handleInputBlur}
    />
    {type === 'text' ? 
    <SC.CloseEye
     size={20}
     onClick={()=> setType('password')}
     />
     : 
     <SC.OpenEye 
      size={20} 
      onClick={()=> setType('text')}
    />}
    {error}
   </SC.Container>
  );
};