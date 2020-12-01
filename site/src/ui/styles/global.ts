import { createGlobalStyle } from 'styled-components';

const CreateGlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
  * {
      padding: 0;
      margin: 0;
      outline: 0;
      box-sizing:border-box;
   }

 body {
    background: ${(props) => props.theme.colors.primary3};
    color: ${(props) => props.theme.colors.primary2};
    -webkit-font-smoothing: antialiased;
 }

 body, input, button {
  font: 1rem 'Roboto', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
   font-weight: 600;
  }

 button {
    cursor: pointer;
  }

 a {
    text-decoration: none;
  }

 ul {
    list-style: none;
  } 
`;

export { CreateGlobalStyle };
