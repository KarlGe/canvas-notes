import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useState } from 'react';
import styled from 'styled-components';
import ElementPosition from '../Models/ElementPosition';
import { editorOptions } from '../config/quillConfig';

const draggingColor = '#0178ba';

const EditorWrapper = styled.div.attrs((props) => ({
  style: {
    left: props.positionOfset.x,
    top: props.positionOfset.y,
    width: '500px',
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
    background: ${(props) => (props.dragging ? draggingColor : 'transparent')};
  }
`;

export default function Editor() {
  const editorRef = useRef();
  const [editor, setEditor] = useState(null);

  const [dragging, setDragging] = useState(false);
  const position = useRef(new ElementPosition(100, 100));
  const lastPosition = useRef(position.current);
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

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    lastPosition.current = new ElementPosition(e.clientX, e.clientY);
    setDragging(true);
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
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

  function closeDragElement() {
    setDragging(false);
    document.onmouseup = null;
    document.onmousemove = null;
  }

  useEffect(() => {
    const editor = new Quill(editorRef.current, editorOptions);
    editor.on('text-change', onChange);
    setEditor(editor);
    return () => {};
  }, []);

  return (
    <EditorWrapper positionOfset={currentPosition} dragging={dragging}>
      <div>{`Current: ${currentPosition.x}, ${currentPosition.y}`}</div>
      <div className="header" onMouseDown={startDragging} />
      <div ref={editorRef} />
    </EditorWrapper>
  );
}
