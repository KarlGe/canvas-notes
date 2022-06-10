import { useMousePosition } from 'Hooks/useMousePosition';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MousePositionIndicator = styled.div`
  position: absolute;
  top: 0px;
  margin-left: 5px;
  background-color: rgba(0,50,100,0.5);
  border: 1px solid rgba(0,50,100,0.8);
  border-radius: 5px;
  width: 5px;
  height: 5px;
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
