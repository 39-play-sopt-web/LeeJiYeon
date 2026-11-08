import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      primaryHover: string;
      white: string;
      black: string;
      gray100: string;
      gray300: string;
      gray500: string;
      error: string;
    };
    radius: {
      sm: string;
      md: string;
    };
  }
}