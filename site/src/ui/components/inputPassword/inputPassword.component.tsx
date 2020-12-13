import React, { useState } from 'react';

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

const InputPassword = ({
    id, 
    icon, 
    name, 
    value, 
    error, 
    placeholder, 
    onChange
}: PropsInputPassword) => {
  const [type, setType] = useState<'text'|'password'>('password');

  return(
    <SC.Container>
      {icon}
    <SC.Input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
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
   </SC.Container>
  );
};

export { InputPassword };