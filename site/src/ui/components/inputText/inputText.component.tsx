import React from 'react';

import * as SC from './inputText.style';
interface PropsInputText {
    id: string;
    icon?: any;
    name: string;
    value: string;
    error?: any;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

const InputText = ({
    id, 
    icon, 
    name, 
    value, 
    placeholder, 
    onChange
}: PropsInputText) => {

  return (
      <SC.Container>
        {icon}
        <SC.Input
          id={id}
          type='text'
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          
        />
      </SC.Container>
  );
};

export { InputText };