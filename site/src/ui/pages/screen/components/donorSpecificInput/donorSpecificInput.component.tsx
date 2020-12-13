import React from 'react';

import * as SC from './donorSpecificInput.style';

interface PropsInputText {
    id: string;
    icon?: any;
    name: string;
    value: string;
    error?: any;
    placeholder: string;
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

const DonorSpecificInput = ({
    id, 
    icon, 
    name, 
    value, 
    placeholder, 
    type,
    onChange
}: PropsInputText) => {

  return (
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
};

export { DonorSpecificInput };