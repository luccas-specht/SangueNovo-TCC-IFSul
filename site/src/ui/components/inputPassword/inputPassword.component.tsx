import React from 'react';

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

};

export { InputPassword };