import { createGlobalStyle } from 'styled-components';
// Font
import munroFont from 'assets/Munro-2LYe.ttf';

export const GlobalStyle = createGlobalStyle`
   @font-face {
        font-family: 'Munro';
        src: url(${munroFont}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }

    * {
        font-family: 'Munro', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
`;
