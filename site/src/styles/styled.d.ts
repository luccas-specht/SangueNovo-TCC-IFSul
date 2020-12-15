import 'styled-components';
declare module 'styled-components' {
  interface DefaultTheme {
    title: string,
    colors: {
      text: string,
      titleColor: string,
      primary: string;
      primary1: string,
      secundary: string,
      background: string,
      backgroundInput: string;
      white: string; 
      colorIconDarkLight: string;
    },
    logo: string;
    imageLoginBackground: string;
    imageRegisterBackground: string;
  }
};

export { DefaultTheme };