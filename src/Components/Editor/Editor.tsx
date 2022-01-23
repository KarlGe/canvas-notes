import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useState } from 'react';
import styled from 'styled-components';
import ElementPosition from 'Models/ElementPosition';
import EditorData from 'Models/EditorData';
import { getEditorOptions } from 'Config/quillConfig';
import { settings } from 'Config/baseConfig';
import Toolbar from './Toolbar';
import CloseIcon from 'Assets/icons/close.svg';
import { useDragPosition } from 'Hooks/useDragPosition';

const borderWidth = 1;
const headerColor = '#0178ba';
const headerDarkColor = '#00598a';
const borderColor = '#ccc';

type StyledProps = {
  elementPosition: ElementPosition;
  parentOffset: ElementPosition;
  dragging: Boolean;
  currentIncrement: number;
  editing: Boolean;
  isActive: Boolean;
};

const EditorWrapper = styled.div.attrs((props: StyledProps) => ({
  style: {
    ...props.elementPosition.getIncrementedStyle(
      props.currentIncrement,
      props.parentOffset
    ),
    width: '250px',
  },
}))`
  position: absolute;
  z-index: 0;
  box-sizing: border-box;
  &:hover {
    .header {
      background: ${(props) => !props.editing && headerColor};
      cursor: move;
    }
    .ql-container {
      border: ${borderWidth}px solid ${borderColor};
    }
  }
  .debug {
    display: none;
    position: absolute;
    width: max-content;
    top: -${settings.sizes.editorHeaderHeight * 2}px;
    z-index: 0;
  }
  .header {
    height: ${settings.sizes.editorHeaderHeight}px;
    background: ${(props: StyledProps) =>
      props.dragging && !props.editing ? headerColor : 'transparent'};
    position: absolute;
    top: -${settings.sizes.editorHeaderHeight}px;
    left: 0;
    right: 0;
    .close-button {
      display: none;
      position: absolute;
      right: 0;
      height: 100%;
      border: none;
      background: ${headerColor};
      border-left: 1px solid ${headerDarkColor};
      &:hover {
        background: ${headerDarkColor};
      }
      > svg:hover {
        cursor: pointer;
      }
    }
    &:hover {
      background: ${headerColor};
      .close-button {
        display: block;
      }
    }
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
  deleteEditor: Function;
}) {
  const {
    editorData,
    currentIncrement,
    isActive,
    setEditing,
    setActiveEditor,
    deleteEditor,
  } = props;

  const editorElement = useRef();
  const editorRef = useRef(null);

  const [editingLocal, setEditingLocal] = useState(false);

  const { currentPosition, isDragging, startDragging, startDraggingEvent } =
    useDragPosition(
      editorData.position,
      () => setEditingState(false),
      () => editorRef.current.focus()
    );

  const setEditingState = (isEditing) => {
    if (isEditing) {
      setActiveEditor(editorData.uuid);
    }
    setEditingLocal(isEditing);
    setEditing(isEditing);
  };

  const onChange = (delta, value, source) => {
    /* source === api | user */
    if (source === 'api') {
      return;
    }
    
  };

  useEffect(() => {
    const editor = new Quill(
      editorElement.current,
      getEditorOptions(editorData.uuid)
    );
    editor.on('text-change', onChange);
    editor.on('selection-change', function (range, oldRange, source) {
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
        parentOffset={editorData.parentOffset}
        dragging={isDragging}
        currentIncrement={currentIncrement}
        onMouseDown={stopPropagation}
        onClick={stopPropagation}
        editing={editingLocal}
        isActive={isActive}
      >
        <div className="header" onMouseDown={startDraggingEvent}>
          <button
            onClick={() => deleteEditor(editorData.uuid)}
            className="close-button"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="debug">{`Active: ${isActive} Editing: ${editingLocal} Position: ${currentPosition.x}, ${currentPosition.y}`}</div>
        <div ref={editorElement} />
      </EditorWrapper>
    </div>
  );
}
