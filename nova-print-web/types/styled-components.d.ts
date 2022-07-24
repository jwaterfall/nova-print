import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      foreground: string;
      selection: string;
      border: string;
      scrollbarThumb: string;
      text: string;
      textSecondary: string;
      primary: string;
      secondary: string;
      button: string;
      buttonHover: string;
    };
    font: {
      family: string;
      size: {
        xxs: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      weight: {
        light: number;
        regular: number;
        medium: number;
        bold: number;
        extraBold: number;
        black: number;
      };
    };
    borderRadius: string;
    transition: string;
  }
}
