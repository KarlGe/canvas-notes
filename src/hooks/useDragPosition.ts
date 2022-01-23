import ElementPosition from 'Models/ElementPosition';
import { useEffect, useRef, useState } from 'react';

export const useDragPosition = (initialPosition, onStartDrag, onEndDrag) => {
  const [isDragging, setIsDragging] = useState(false);
  const position = useRef(initialPosition);
  const lastPosition = useRef(initialPosition);
  const [currentPosition, setCurrentPosition] = useState(position.current);

  function startDragging() {
    setIsDragging(true);
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  const cleanup = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  function startDraggingEvent(e) {
    e = e || window.event;
    e.preventDefault();
    lastPosition.current = new ElementPosition(e.pageX, e.pageY);
    startDragging();
    if (typeof onStartDrag === 'function') {
      onStartDrag();
    }
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    const { pageX, pageY } = e;
    const { x: lastX, y: lastY } = lastPosition.current;
    position.current.add(pageX - lastX, pageY - lastY);
    lastPosition.current = new ElementPosition(pageX, pageY);
    setCurrentPosition(
      new ElementPosition(position.current.x, position.current.y)
    );
  }

  function closeDragElement(e) {
    setIsDragging(false);
    setCurrentPosition(
      new ElementPosition(position.current.x, position.current.y)
    );
    e.preventDefault();
    cleanup();

    if (typeof onEndDrag === 'function') {
      onEndDrag();
    }
  }
  return {
    currentPosition,
    isDragging,
    startDragging,
    startDraggingEvent,
  };
};
