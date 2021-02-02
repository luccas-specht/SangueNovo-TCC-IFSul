import styled from 'styled-components';

import { FiSun, FaMoon } from 'react-icons/all';

import { device } from '../../../constants/style/responsivenessAvailable';

export const Container = styled.div`
    position: absolute;
    top: 5%;
    left: 90%;

        svg {
            color: ${({ theme }) => theme.colors.colorIconDarkLight};
            cursor: pointer;
        }  

    @media ${device.mobileL()} {
        top: 5%;
        left: 80%;
    }
`;

export const StyleFiSun = styled(FiSun)`
    width: 23px;
    height: 23px;
`; 

export const StyleFaMoon = styled(FaMoon)`   
    width: 20px;
    height: 20px;
`; 