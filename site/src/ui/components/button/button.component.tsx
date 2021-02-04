import React from 'react';

import * as SC from './button.style';
interface Props {
    title: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean 
};

export const Button = ({ 
  title, 
  type, 
  disabled = false
 }: Props) => (
  <SC.Button type={type} disabled={disabled}> {title} </SC.Button>
);