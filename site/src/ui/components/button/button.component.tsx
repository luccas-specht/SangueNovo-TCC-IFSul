import React from 'react';

import * as SC from './button.style';
interface Props {
    title: string;
    type: 'button' | 'submit' | 'reset';
  }

export const Button = ({ title, type }: Props) => 
  <SC.Button type={type}> {title} </SC.Button>;