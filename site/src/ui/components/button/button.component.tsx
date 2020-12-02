import React from 'react';

import * as SC from './button.style';
interface PropsButton {
    title: string;
    type: 'button' | 'submit' | 'reset';
  }

const Button = ({ title, type }: PropsButton) => (<SC.Button type={type}> {title}</SC.Button>);

export { Button };