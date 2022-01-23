import { useMousePosition } from 'Hooks/useMousePosition';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MousePositionIndicator = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  width: 10px;
  height: 10px;
  pointer-events: none;
  z-index: 100;
`;

export const MousePosition = () => {
  const mousePosition = useMousePosition();
  return (
    <MousePositionIndicator
      style={
        mousePosition ? { left: mousePosition.x, top: mousePosition.y } : null
      }
    />
  );
};
