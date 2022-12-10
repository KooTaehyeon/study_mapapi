import React from 'react';
import { Global, css, jsx } from '@emotion/react';
const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          body {
            font-weight: 300;
            margin: 0px;
            padding: 0px;
            border: 0px;
            font: inherit;
            vertical-align: baseline;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        }
      `}
    />
  );
};

export default GlobalStyles;
