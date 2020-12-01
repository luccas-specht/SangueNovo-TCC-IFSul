import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary2: string;
      primary3: string;
      gray: string;
      grayHard: string;
      shape: string;
      blackMedium: string;
      inputs: string;
      error: string;
      white: string
    };
  }
}
