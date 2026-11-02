export const theme = {
  colors: {
    background: '#141414',
    surface: '#1f1f1f',
    surfaceHover: '#2a2a2a',
    border: '#333333',
    primary: '#e50914',
    primaryHover: '#f6121d',
    onPrimary: '#ffffff',
    textPrimary: '#ffffff',
    textSecondary: '#b3b3b3',
    textTertiary: '#808080',
  },
  fontSize: {
    xs: '1.2rem',
    sm: '1.4rem',
    md: '1.6rem',
    lg: '2rem',
    xl: '2.4rem',
  },
  radius: {
    sm: '0.6rem',
    md: '1rem',
    full: '999rem',
  },
  layout: {
    maxWidth: '120rem',
    headerHeight: '6rem',
  },
} as const;

export type AppTheme = typeof theme;