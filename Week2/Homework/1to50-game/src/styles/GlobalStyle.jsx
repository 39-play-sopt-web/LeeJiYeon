import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;
      }
      button,
      select {
        font: inherit;
        cursor: pointer;
      }
    `}
  />
);

export default GlobalStyle;