import styled, { css } from 'styled-components';
interface IconChangeTheme {
    namePage: 'login' | 'register' | 'forgotPassword' | 'resetPassword';
 }
 
export const Container = styled.div<IconChangeTheme>`
    ${props => props.namePage === 'login' && 
        css`
            display: flex;
            align-items: center;
            height: 40px;
            width: 10%;
            max-width: 50px; 
            margin-right: -600px;
            margin-top: -95px;
            
            svg {
                color: ${props => props.theme.colors.colorIconDarkLight};
                width: 25px;
                height: 25px;
                cursor: pointer;
            }`
    }

    ${props => props.namePage === 'resetPassword' && 
            css`
                display: flex;
                align-items: center;
                height: 40px;
                width: 10%;
                max-width: 50px; 
                margin-right: -600px;
                margin-top: -55.5px;

                svg {
                    color: ${props => props.theme.colors.colorIconDarkLight};
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                }`
        }

    ${props => props.namePage === 'register' && 
                css`
                    display: flex;
                    align-items: center;
                    height: 40px;
                    width: 10%;
                    max-width: 50px; 
                    margin-right: -450px;
                    margin-top: -130px;

                    svg {
                        color: ${props => props.theme.colors.colorIconDarkLight};
                        width: 25px;
                        height: 25px;
                        cursor: pointer;
                    }`
    }

    ${props => props.namePage === 'forgotPassword' && 
                css`
                    display: flex;
                    align-items: center;
                    height: 40px;
                    width: 10%;
                    max-width: 50px; 
                    margin-right: -600px;
                    margin-top: -165px;

                    svg {
                        color: ${props => props.theme.colors.colorIconDarkLight};
                        width: 25px;
                        height: 25px;
                        cursor: pointer;
                    }`
    }
`;