import styled from 'styled-components';

export const Error = styled.div`
   height: 20px;
   color: ${({ theme }) => theme.colors.errorColor};
   cursor: pointer;

    svg {
        margin: 0;
    }
`;

export const Container = styled.div`
   position: relative;

     span {
        width: 200px;
        background-color: ${({ theme }) => theme.colors.errorColor};;
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.white};
        opacity: 0;
        transition: opacity 0.4s;
        visibility: hidden;

        position: absolute;
        bottom: calc(100% + 12px);
        left: 50%;
        transform: translateX(-50%);

            &::before {
               content: '';
               border-style: solid;
               border-color: ${({ theme }) => theme.colors.errorColor} transparent;
               border-width: 6px 6px 0 6px;
               top: 100%;
               position: absolute;
               left: 50%;
               transform: translateX(-50%);
            }
    }

    &:hover span {
        opacity: 1;
        visibility: visible;
    }
`;