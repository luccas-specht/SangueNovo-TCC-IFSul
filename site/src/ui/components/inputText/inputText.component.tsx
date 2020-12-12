import React from 'react';

// import * as SC from './inputText.style';
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
    error, 
    placeholder, 
    onChange
}: PropsInputText) => {

};

export { InputText };