import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    
        svg {
            color: ${({ theme }) => theme.colors.colorIconDarkLight};
            width: 25px;
            height: 25px;
            cursor: pointer;
        }
`;