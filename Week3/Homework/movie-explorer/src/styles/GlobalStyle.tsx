import { Global, css } from '@emotion/react';

const GlobalStyle = () => {
  return (
    <Global
      styles={(theme) => css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 62.5%;
        }

        body {
          font-family:
            'Pretendard',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: ${theme.fontSize.md};
          background-color: ${theme.colors.background};
          color: ${theme.colors.textPrimary};
          -webkit-font-smoothing: antialiased;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font: inherit;
          color: inherit;
          background: none;
          border: none;
          cursor: pointer;
        }

        img {
          display: block;
          max-width: 100%;
        }

        ul,
        ol {
          list-style: none;
        }
      `}
    />
  );
};

export default GlobalStyle;