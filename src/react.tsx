import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components'
import Page from './Components/Page';

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    height: 100%;
  }
`;

const Index = () => {
  return (
    <>
      <GlobalStyle />
      <Page title="Test" />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
