import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useState } from 'react';
import styled from 'styled-components';
import ElementPosition from '../Models/ElementPosition';
import { editorOptions } from '../config/quillConfig';
import EditorData from '../Models/EditorData';

const draggingColor = '#0178ba';

type StyledProps = {
  elementPosition: ElementPosition;
  dragging: Boolean;
  currentIncrement: number,
};

const EditorWrapper = styled.div.attrs((props: StyledProps) => ({
  style: {
    ...props.elementPosition.getIncrementedStyle(props.currentIncrement),
    width: '250px',
  },
}))`
  position: absolute;
  &:hover {
    .header {
      background: ${draggingColor};
    }
  }
  .header {
    height: 25px;
    background: ${(props: StyledProps) =>
      props.dragging ? draggingColor : 'transparent'};
  }
`;

export default function Editor(props: {
  editorData: EditorData;
  initialEvent: Event;
  currentIncrement: number,
}) {
  const { editorData, currentIncrement, initialEvent } = props;
  const editorRef = useRef();
  const [editor, setEditor] = useState(null);

  const [dragging, setDragging] = useState(false);
  const position = useRef(editorData.position);
  const lastPosition = useRef(editorData.getInitialClickPosition());
  const [currentPosition, setCurrentPosition] = useState(position.current);

  const onChange = (delta, value, source) => {
    /* source === api | user */
    if (source === 'api') {
      return;
    }
    console.log(value, source);
    console.log(delta);

    // this.html = this.editor.root.innerHTML;

    // if (this.onChangeTimeout) {
    //   clearTimeout(this.onChangeTimeout);
    //   this.onChangeTimeout = null;
    // }

    // this.onChangeTimeout = setTimeout(() => this.commitValue(), 300);
  };

  function startDragging() {
    // get the mouse cursor position at startup:
    setDragging(true);
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function startDraggingEvent(e) {
    e = e || window.event;
    e.preventDefault();
    lastPosition.current = new ElementPosition(e.clientX, e.clientY);
    startDragging();
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    const { clientX, clientY } = e;
    const { x: lastX, y: lastY } = lastPosition.current;
    position.current.add(clientX - lastX, clientY - lastY);
    lastPosition.current = new ElementPosition(clientX, clientY);
    setCurrentPosition(
      new ElementPosition(position.current.x, position.current.y)
    );
  }

  function closeDragElement(e) {
    setDragging(false);
    position.current.applyIncrement(currentIncrement);
    setCurrentPosition(
      new ElementPosition(position.current.x, position.current.y)
    );
    e.preventDefault();
    document.onmouseup = null;
    document.onmousemove = null;
  }

  useEffect(() => {
    const editor = new Quill(editorRef.current, editorOptions);
    editor.on('text-change', onChange);
    setEditor(editor);
    startDragging();
    return () => {};
  }, []);

  return (
    <EditorWrapper
      elementPosition={currentPosition}
      dragging={dragging}
      currentIncrement={currentIncrement}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="header" onMouseDown={startDraggingEvent} />
      <div>{`Current: ${currentPosition.x}, ${currentPosition.y}`}</div>
      <div ref={editorRef} />
    </EditorWrapper>
  );
}
