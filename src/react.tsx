import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Page from 'Components/Page';
import { initializeQuill } from 'Config/quillConfig';
import CursorIcon from 'Assets/icons/cursor.inline.svg';

const GlobalStyle = createGlobalStyle`
  * {
    cursor: url(${CursorIcon}), auto;
  }
  html, body, #app {
    height: 100%;
  }
`;

const Index = () => {
  return (
    <>
      <GlobalStyle />
      <Page initialTitle="Test" />
    </>
  );
};

initializeQuill();

ReactDOM.render(<Index />, document.getElementById('app'));
