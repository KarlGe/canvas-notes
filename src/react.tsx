import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import CursorIcon from 'Assets/icons/cursor.inline.svg';
import { ApplicationWrapper } from 'Components/ApplicationWrapper/ApplicationWrapper';

const GlobalStyle = createGlobalStyle`
  * {
    cursor: url(${CursorIcon}), auto;
  }
  html, body, #app {
    height: 100%;
    margin: 0;
  }
`;

const Index = () => {
  return (
    <>
      <GlobalStyle />
      <ApplicationWrapper />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
