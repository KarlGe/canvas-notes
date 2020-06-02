import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Index = () => {
  return (
    <>
      <h1>Is this for real?</h1>
      <div>Hello React!</div>
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
