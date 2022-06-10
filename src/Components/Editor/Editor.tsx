import React, { useCallback, useEffect, useRef } from 'react';
import {
  Editor as SlateEditor,
  Element as SlateElement,
  Text as SlateText,
  createEditor,
  Descendant,
} from 'slate';
import classNames from 'classnames';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { useState } from 'react';
import EditorData, { editorDefaultContent } from 'Models/EditorData';
import Toolbar from './Toolbar';
import CloseIcon from 'Assets/icons/close.svg';
import { useDragPosition } from 'Hooks/useDragPosition';
import { EditorElement, elementTypes } from 'Models/SlateTypes';
import { EditorWrapper } from './Editor.styles';
import { useRenderElement } from 'Hooks/useRenderElement';
import EditorLeaf from '../EditorElements/EditorLeaf';
import {
  isDescendantsEmpty,
  toggleBlockType,
  toggleBoldMark,
} from 'Helpers/editorHelpers';
import ElementPosition from 'Models/ElementPosition';

export default function Editor(props: {
  editorData: EditorData;
  parentOffset: ElementPosition;
  currentIncrement: number;
  setEditing: Function;
  isActive: Boolean;
  setActiveEditor: Function;
  deleteEditor: Function;
  saveEditor: Function;
}) {
  const {
    editorData,
    parentOffset,
    currentIncrement,
    isActive,
    setEditing,
    setActiveEditor,
    deleteEditor,
    saveEditor,
  } = props;

  const [value, setValue] = useState<Descendant[]>(
    editorData.content || editorDefaultContent
  );
  const [editor] = useState(() => withReact(createEditor()));
  const [isEmpty, setIsEmpty] = useState(isDescendantsEmpty(value));
  const [editingLocal, setEditingLocal] = useState(false);

  const onSaveEditor = (
    position: ElementPosition,
    editorValue: Descendant[]
  ) => {
    saveEditor(new EditorData(editorData.uuid, position, editorValue));
  };

  const onDragEnd = (newPosition: ElementPosition) => {
    ReactEditor.focus(editor);
    onSaveEditor(newPosition, value);
  };

  const { currentPosition, isDragging, startDragging, startDraggingEvent } =
    useDragPosition(
      editorData.position,
      () => setEditingState(false),
      onDragEnd
    );

  const setEditingState = (isEditing) => {
    if (isEditing) {
      setActiveEditor(editorData.uuid);
    }
    setEditingLocal(isEditing);
    setEditing(isEditing);
  };

  useEffect(() => {
    ReactEditor.focus(editor);
    onSaveEditor(currentPosition, value);
  }, []);

  const stopPropagation = (e) => {
    e.stopPropagation();
    if (!isActive) {
      setActiveEditor(editorData.uuid);
    }
  };

  const renderElement = useRenderElement();

  const onKeyDown = (event) => {
    if (!event.ctrlKey) {
      return;
    }
    switch (event.key) {
      case 'c': {
        event.preventDefault();
        toggleBlockType(editor, elementTypes.code);
        break;
      }
      case 'b': {
        event.preventDefault();
        toggleBoldMark(editor);
        break;
      }
    }
  };

  const renderLeaf = useCallback((props) => {
    return <EditorLeaf {...props} />;
  }, []);

  const onChange = (newValue) => {
    setValue(newValue);
    const shouldSave = editor.operations.some(
      (op) => 'set_selection' !== op.type
    );
    setIsEmpty(isDescendantsEmpty(newValue));
    if (shouldSave) {
      onSaveEditor(currentPosition, newValue);
    }
  };

  return (
    <div onClick={stopPropagation} onMouseDown={stopPropagation}>
      <Toolbar active={editingLocal || isActive} toolbarId={editorData.uuid} />
      <EditorWrapper
        elementPosition={currentPosition}
        parentOffset={parentOffset}
        dragging={isDragging}
        currentIncrement={currentIncrement}
        onMouseDown={stopPropagation}
        onClick={stopPropagation}
        editing={editingLocal}
        className={classNames([
          !isEmpty && 'has-content',
          isActive && 'is-active',
        ])}
      >
        <Slate editor={editor} value={value} onChange={onChange}>
          <div className="header" onMouseDown={startDraggingEvent}>
            <button
              onClick={() => deleteEditor(editorData.uuid)}
              className="close-button"
            >
              <CloseIcon />
            </button>
          </div>
          <Editable
            renderElement={renderElement}
            className="editable-container"
            renderLeaf={renderLeaf}
            onKeyDown={onKeyDown}
          />
        </Slate>
        <div className="debug">{`Active: ${isActive} Editing: ${editingLocal} Position: ${currentPosition.x}, ${currentPosition.y}`}</div>
      </EditorWrapper>
    </div>
  );
}
