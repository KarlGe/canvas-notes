import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Editor from './Components/Editor';

const Index = () => {
  return (
    <>
      <h1>Sick note app</h1>
      <Editor />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
