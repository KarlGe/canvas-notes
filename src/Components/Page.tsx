import React, { useRef, ReactText } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import EditorData from '../Models/EditorData';
import ElementPosition from '../Models/ElementPosition';
import Editor, { editorHeaderHeight } from './Editor/Editor';
import Toolbar from './Editor/Toolbar';
import { uuidv4 } from '../helpers/uuid';

const Document = styled.div`
  width: 100%;
  height: 100%;
  .documentContent {
    width: 100%;
    height: 100%;
    background-color: #eee;
    position: relative;
  }
`;

function Page(props: { title: string }) {
  const { title } = props;
  const contentRef = useRef(null);
  const [editors, setEditors] = useState<EditorData[]>([]);
  const [activeEditor, setActiveEditor] = useState<string>();
  const [editing, setEditing] = useState(false);

  const documentMouseDown = (e) => {
    if (editing) {
      return;
    }
    const { offsetTop, offsetLeft } = contentRef.current;

    const { clientX, clientY } = e;

    const editorData = new EditorData(
      uuidv4(),
      new ElementPosition(
        clientX - offsetLeft,
        clientY - offsetTop + editorHeaderHeight
      ),
      e.target
    );
    setActiveEditor(editorData.uuid);
    setEditors((prevEditors) => [...prevEditors, editorData]);
  };
  const editorElements = editors.map((editor) => (
    <Editor
      isActive={activeEditor === editor.uuid}
      key={editor.uuid as ReactText}
      setEditing={setEditing}
      editorData={editor}
      currentIncrement={20}
      setActiveEditor={setActiveEditor}
    />
  ));
  return (
    <Document onClick={() => setActiveEditor(null)}>
      <h1>{title}</h1>
      <div
        className="documentContent"
        ref={contentRef}
        onMouseDown={documentMouseDown}
      >
        {editorElements}
      </div>
    </Document>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Page;
