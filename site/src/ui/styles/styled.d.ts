import 'styled-components';
declare module 'styled-components' {
  interface DefaultTheme {
    colors: {
      redLight: string,
      grayLight: string,
      whiteLight: string,
      grayDarklLight: string,
      redDark: string,
      whiteDark: string,
      blackMediumDark: string,
      blackHighDark: string,
    };
  }
};

export { DefaultTheme };