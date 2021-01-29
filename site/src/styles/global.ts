import { createGlobalStyle } from 'styled-components';

export const CreateGlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
  * {
      padding: 0;
      margin: 0;
      outline: 0;
      box-sizing: border-box;
   }

 body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
 }

 html, body, #root {
    height: 100vh;
  }

 body, input, button, li {
  font: 1rem 'Roboto', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong, li {
   font-weight: 600;
   color: ${(props) => props.theme.colors.titleColor};
  }

 button, li {
    cursor: pointer;
  }

 a {
    text-decoration: none;
  }

 ul {
    list-style: none;
  } 
`;