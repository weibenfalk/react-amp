import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        user-select: none;
        image-rendering: pixelated;
        font-family: 'Munro', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: #00e800;
    }
`;
