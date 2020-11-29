import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useState } from 'react';
import styled from 'styled-components';
const editorOptions = {
  readOnly: false,
  // bounds: '.' + gridBem.block(),
  theme: 'snow',
  modules: {
    toolbar: [
      [
        { header: '1' },
        { header: '2' },
        { font: ['', 'open-sans', 'roboto', 'proza-libre'] },
        { size: ['1em', '1.25em', '1.5em', '2em', '3em', '4em'] },
      ],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ align: ['', 'center', 'right'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  },
  formats: [
    'align',
    'background',
    'header',
    'font',
    'size',
    'align',
    'bold',
    'italic',
    'underline',
    'strike',
    'script',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'clean',
  ],
};

const EditorWrapper = styled.div.attrs((props) => ({
  style: {
    left: props.positionOfset.x,
    top: props.positionOfset.y,
  },
}))`
  position: absolute;
  &:hover {
    .header {
      background: red;
    }
  }
  .header {
    height: 10px;
  }
`;

class ElementPosition {
  x;
  y;
  constructor(x, y) {
    this.x = this.min(x);
    this.y = this.min(y);
  }

  add(xOfset, yOfset) {
    this.x = this.min(this.x + xOfset);
    this.y = this.min(this.y + yOfset);
  }

  min(value, minValue = 0) {
    return value < minValue ? minValue : value;
  }
}

export default function Editor() {
  const editorRef = useRef();
  const [editor, setEditor] = useState(null);

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
    document.onmouseup = null;
    document.onmousemove = null;
  }

  useEffect(() => {
    const editor = new Quill(editorRef.current, editorOptions);
    console.log(editor);
    editor.on('text-change', onChange);
    setEditor(editor);
    return () => {};
  }, []);

  return (
    <EditorWrapper positionOfset={currentPosition}>
      <div>{`Current: ${currentPosition.x}, ${currentPosition.y}`}</div>
      <div className="header" onMouseDown={startDragging} />
      <div ref={editorRef} />
    </EditorWrapper>
  );
}
