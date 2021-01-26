import React from 'react';

import * as SC from './donorSpecificInput.style';

interface PropsInputText {
    id: string;
    icon: React.ReactNode;
    name: string;
    value: string;
    error?: any;
    placeholder: string;
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

export const DonorSpecificInput = ({
    id, 
    icon, 
    name, 
    value, 
    placeholder, 
    type,
    onChange
}: PropsInputText) => (
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
      </SC.Container>
  );