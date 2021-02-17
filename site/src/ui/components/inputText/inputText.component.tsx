import React, { 
  useState, 
  useCallback
} from 'react';

import { TooltipAlertError } from '../index';

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
    error,
    value, 
    placeholder, 
    onChange
}: PropsInputText) => {
  console.log('error', error)
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const showError = useCallback(()=> {
    return error && <TooltipAlertError messageError={error}/>
  }, [error]);

  return(
    <S.Container 
      isFocused={isFocused} 
      isErrored={!!error}
    >
       {icon}
       <S.Input
         type='text'
         id={id}
         name={name}
         value={value}
         placeholder={placeholder}
         onChange={onChange}
         onFocus={() => setIsFocused(true)}
         onBlur={() => setIsFocused(false)}
       />
       {showError()}
    </S.Container>
  );
};