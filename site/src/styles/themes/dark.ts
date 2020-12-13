import loginImgDark from '../../ui/assets/images/login-background-dark.png';
import logoSangueNovoDark from '../../ui/assets/svg/logo-sangue-novo-dark.svg';

import { DefaultTheme } from 'styled-components';

const dark: DefaultTheme = {
  title: 'dark',
  colors: {
    text: '#fff',
    primary: '#999591',
    primary1: '#FF9000',
    secundary: 'FF9000',
    background: '#232129',
    backgroundInput: '#FFF',
    white: '#FFF',
    colorIconDarkLight: '#FF9000',
  },
  imageBackground: loginImgDark,
  logo: logoSangueNovoDark
};
export { dark };
