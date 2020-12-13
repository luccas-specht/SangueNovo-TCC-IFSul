import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    width: 25%;

    svg {
        color: ${props => props.theme.colors.colorIconDarkLight};
        width: 23px;
        height: 23px;
        margin-top: -120px;
        margin-right: -600px;
        display: flex;
        flex: 1;
        cursor: pointer;
    }

`;

export { Container };