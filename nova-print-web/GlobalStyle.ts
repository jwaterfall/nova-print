import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
        scrollbar-width: thin;
        scrollbar-color: ${({ theme }) => theme.colors.scrollbarThumb} transparent;
    }

    :root {
        font-size: 16px;
        font-family: ${({ theme }) => theme.font.family};
        color: ${({ theme }) => theme.colors.text};
        line-height: 1.3;
        
        @media (max-width: 768px) {
            font-size: 17px;
        }
        @media (max-width: 576px) {
            font-size: 18px;
        }
    }

    body {
        background: ${({ theme }) => theme.colors.background};
    }

    ::-webkit-scrollbar {
        width: 0.5rem;
        @media (max-width: 992px) {
        display: none;
        }
    }
    ::-webkit-scrollbar-thumb {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.scrollbarThumb};
    }
`;

export default GlobalStyle;
