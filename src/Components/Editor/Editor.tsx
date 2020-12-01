import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useState } from 'react';
import styled from 'styled-components';
import ElementPosition from '../../Models/ElementPosition';
import { getEditorOptions } from '../../config/quillConfig';
import EditorData from '../../Models/EditorData';
import Toolbar from './Toolbar';

export const editorHeaderHeight = 25;
const borderWidth = 1;
const draggingColor = '#0178ba';
const borderColor = '#ccc';

type StyledProps = {
  elementPosition: ElementPosition;
  dragging: Boolean;
  currentIncrement: number;
  editing: Boolean;
  isActive: Boolean;
};

const EditorWrapper = styled.div.attrs((props: StyledProps) => ({
  style: {
    ...props.elementPosition.getIncrementedStyle(props.currentIncrement),
    width: '250px',
  },
}))`
  position: absolute;
  box-sizing: border-box;
  &:hover {
    .header {
      background: ${(props) => !props.editing && draggingColor};
    }
    .ql-container {
      border: ${borderWidth}px solid ${borderColor};
    }
  }
  .debug {
    display: none;
    position: absolute;
    width: max-content;
    top: -${editorHeaderHeight * 2}px;
    z-index: 0;
  }
  .header {
    height: ${editorHeaderHeight}px;
    background: ${(props: StyledProps) =>
      props.dragging && !props.editing ? draggingColor : 'transparent'};
    position: absolute;
    top: -${editorHeaderHeight}px;
    left: 0;
    right: 0;
    &:hover {
      background: ${draggingColor};
    }
  }
  .ql-toolbar {
    position: absolute;
    width: max-content;
    top: -${editorHeaderHeight}px;
    display: ${(props) => (props.editing ? 'block' : 'none')};
  }

  .ql-container {
    box-sizing: border-box;
    border: ${(props) =>
      props.editing || props.isActive
        ? `${borderWidth}px solid ${borderColor} !important`
        : `${borderWidth}px solid transparent`};
  }
`;

export default function Editor(props: {
  editorData: EditorData;
  currentIncrement: number;
  setEditing: Function;
  isActive: Boolean;
  setActiveEditor: Function;
}) {
  const {
    editorData,
    currentIncrement,
    isActive,
    setEditing,
    setActiveEditor,
  } = props;

  const editorElement = useRef();
  const editorRef = useRef(null);

  const [editingLocal, setEditingLocal] = useState(false);

  const setEditingState = (isEditing) => {
    if (isEditing) {
      setActiveEditor(editorData.uuid);
    }
    setEditingLocal(isEditing);
    setEditing(isEditing);
  };

  const [dragging, setDragging] = useState(false);
  const position = useRef(editorData.position);
  const lastPosition = useRef(
    editorData.getInitialClickPosition(0, editorHeaderHeight * -1)
  );
  const [currentPosition, setCurrentPosition] = useState(position.current);

  const onChange = (delta, value, source) => {
    /* source === api | user */
    if (source === 'api') {
      return;
    }

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
    setEditingState(false);
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
    editorRef.current.focus();
    document.onmouseup = null;
    document.onmousemove = null;
  }

  useEffect(() => {
    const editor = new Quill(
      editorElement.current,
      getEditorOptions(editorData.uuid)
    );
    editor.on('text-change', onChange);
    editor.on('selection-change', function (range, oldRange, source) {
      console.log(source);

      if (range === null && oldRange !== null) {
        setEditingState(false);
      } else if (range !== null && oldRange === null) {
        setEditingState(true);
      }
    });
    editorRef.current = editor;
    startDragging();
    return () => {};
  }, []);

  const stopPropagation = (e) => {
    e.stopPropagation();
    if (!isActive) {
      setActiveEditor(editorData.uuid);
    }
  };

  return (
    <div onClick={stopPropagation} onMouseDown={stopPropagation}>
      <Toolbar active={editingLocal || isActive} toolbarId={editorData.uuid} />
      <EditorWrapper
        elementPosition={currentPosition}
        dragging={dragging}
        currentIncrement={currentIncrement}
        onMouseDown={stopPropagation}
        onClick={stopPropagation}
        editing={editingLocal}
        isActive={isActive}
      >
        <div className="header" onMouseDown={startDraggingEvent} />
        <div className="debug">{`Active: ${isActive} Editing: ${editingLocal} Position: ${currentPosition.x}, ${currentPosition.y}`}</div>
        <div ref={editorElement} />
      </EditorWrapper>
    </div>
  );
}
