import React from 'react';

import { FiAlertCircle } from 'react-icons/all';

import * as S from './tooltipAlertError.style';

type Props = {
    messageError: string;
}

export const TooltipAlertError = ({ messageError }: Props) => (
    <S.Error>
        <S.Container>
           <FiAlertCircle size={20}/>
           <span>{messageError}</span>
        </S.Container>
    </S.Error>
);