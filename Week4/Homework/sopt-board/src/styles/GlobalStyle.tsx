import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;
        background-color: #f9fafb;
        color: #111111;
      }

      button {
        border: none;
        background: none;
        cursor: pointer;
        font: inherit;
      }

      button:disabled {
        cursor: not-allowed;
      }

      input,
      textarea,
      select {
        font: inherit;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      ul,
      li {
        list-style: none;
      }
    `}
  />
);

export default GlobalStyle;