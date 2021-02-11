import React from 'react';

import * as SC from './inputDatePicker.style';

interface Props {
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
    error, 
    placeholder, 
    onChange
}: Props) => {
  
  return (
    <SC.Container >
      {icon}
    <SC.Input
      id={id}
      name={name}
      value={value}
      type='date'
      placeholder={placeholder}
      onChange={onChange}
    />
   </SC.Container>
  );
};