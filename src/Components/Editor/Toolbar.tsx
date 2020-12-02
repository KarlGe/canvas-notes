import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { documentColor } from 'Components/Page';

type StyledProps = {
  active: Boolean;
};

const ToolbarWrapper = styled.div<StyledProps>`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: relative;
  z-index: 100;
  background-color: ${documentColor};
`;

function Toolbar(props: { toolbarId: string; active: Boolean }) {
  const { toolbarId, active } = props;
  return (
    <ToolbarWrapper active={active}>
      <div id={`toolbar-${toolbarId}`}>
        <select className="ql-font">
          <option value="" />
          <option value="mirza">Open Sans</option>
          <option value="roboto">Roboto</option>
        </select>
        <select className="ql-size">
          <option value="small" />
          <option value="normal" selected />
          <option value="large" />
          <option value="huge" />
        </select>
        <button className="ql-bold"></button>
        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
      </div>
    </ToolbarWrapper>
  );
}

Toolbar.propTypes = {};

export default Toolbar;
