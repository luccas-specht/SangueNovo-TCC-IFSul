import React, { useState } from 'react';

import { MdRemoveRedEye, BsFillEyeSlashFill } from 'react-icons/all';

import * as SC from './inputPassword.style';

interface Props {
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
    error, 
    placeholder, 
    onChange
}: Props) => {
  const [type, setType] = useState<'text'|'password'>('password');
  
  return (
    <SC.Container >
      {icon}
    <SC.Input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
    {type === 'text' ? (
       <button onClick={() => setType('password')}>
         <MdRemoveRedEye/>
       </button>
    ) : (
      <button onClick={() => setType('text')}>
        <BsFillEyeSlashFill/>
      </button>
    )}
   </SC.Container>
  );
};