import React, { useState, useCallback } from 'react';

import * as SC from './inputText.style';
interface PropsInputText {
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
    error, 
    name, 
    value, 
    placeholder, 
    onChange
}: PropsInputText) => {
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
          type='text'
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={handleInputBlur}
        />
    </SC.Container>
  );
};