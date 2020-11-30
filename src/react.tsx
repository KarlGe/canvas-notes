import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Page from './Components/Page';

const Index = () => {
  return (
    <>
      <Page title="Test" />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
