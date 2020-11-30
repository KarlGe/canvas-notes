import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

function Page({ title }) {
  const [editors, setEditors] = useState([]);
  return (
    <div>
      <h1>Title</h1>
    </div>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Page;
