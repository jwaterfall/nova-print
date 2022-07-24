import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  colors: {
    background: 'rgb(17,17,17)',
    foreground: 'rgb(26,28,30)',
    selection: 'rgb(37,39,45)',
    border: 'rgb(26,28,30)',
    scrollbarThumb: 'hsla(0, 0%, 100%, 0.1)',
    text: 'hsl(0, 0%, 98%)',
    textSecondary: 'hsl(90, 1%, 59%)',
    primary: 'rgb(0,122,255)',
    secondary: 'rgb(255,59,48)',
    button: 'rgb(26,28,30)',
    buttonHover: 'rgb(37,39,45)',
  },
  font: {
    family: `'Nunito', sans-serif;`,
    size: {
      xxs: '0.75rem',
      xs: '0.8125rem',
      sm: '0.9rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
      xxxl: '4rem',
    },
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
  },
  borderRadius: '0.5rem',
  transition: 'all 0.25s cubic-bezier(0.645,0.045,0.355,1);',
};

export const lightTheme: DefaultTheme = {
  colors: {
    background: 'rgb(255,255,255)',
    foreground: 'rgb(245,245,245)',
    selection: 'rgb(235,235,235)',
    border: 'rgb(229,229,234)',
    scrollbarThumb: 'hsla(0, 0%, 100%, 0.1)',
    text: 'hsl(0, 0%, 0%)',
    textSecondary: 'rgb(73,72,75)',
    primary: 'rgb(0,122,255) ',
    secondary: 'rgb(255,59,48)',
    button: 'rgb(245,245,245)',
    buttonHover: 'rgb(235,235,235)',
  },
  font: {
    family: `'Nunito', sans-serif;`,
    size: {
      xxs: '0.75rem',
      xs: '0.8125rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
      xxxl: '4rem',
    },
    weight: {
      light: 300,
      regular: 500,
      medium: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
  },
  borderRadius: '0.5rem',
  transition: 'all 0.25s cubic-bezier(0.645,0.045,0.355,1);',
};
