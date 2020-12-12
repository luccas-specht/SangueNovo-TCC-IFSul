import 'styled-components';
declare module 'styled-components' {
  interface DefaultTheme {
    title: string,
    colors: {
      primary: string,
      primary1: string,
      secundary: string,
      background: string,
      text: string
    },
  }
};

export { DefaultTheme };