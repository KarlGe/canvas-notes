import React, { useRef, ReactText } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import EditorData from 'Models/EditorData';
import ElementPosition from 'Models/ElementPosition';
import { getUUID } from 'Helpers/uuid';
import CursorAddIcon from 'Assets/icons/cursor-add.inline.svg';
import Editor from './Editor/Editor';
import EditableField from './UI/EditableField/EditableField';
import { settings } from 'Config/baseConfig';
import EditorDocument from 'Models/EditorDocument';

type StyledTypes = {
  hasActiveEditor: Boolean;
};

const Document = styled.div<StyledTypes>`
  width: 100%;
  height: 100%;
  position: relative;
  .documentContent {
    width: 100%;
    height: 100%;
    background-color: ${settings.colors.documentColor};
    position: relative;
    &:hover {
      cursor: ${(props) =>
        props.hasActiveEditor ? null : `url(${CursorAddIcon}), auto`};
    }
  }
`;

const PageTitle = styled(EditableField)`
  background: ${settings.colors.documentColor};
  display: block;
  input,
  h1 {
    height: 2rem;
    border: 1px solid #424242;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    font-size: 2rem;
    font-weight: normal;
    margin-bottom: 0;
    margin-top: 1.5rem;
    color: #303030;
    font-family: sans-serif;
    padding: 0.25rem;
    line-height: 1;
    display: inline-block;
    min-width: 20rem;
    margin: 1rem;
    &:hover {
      cursor: text;
    }
  }
  input {
    background: #ddd;
  }
`;

interface PageProps {
  editorDocument: EditorDocument;
  onChangeTitle: (uuid: string, newTitle: string) => void;
}

function Page(props: PageProps) {
  const { editorDocument, onChangeTitle } = props;
  const contentRef = useRef(null);
  const [editors, setEditors] = useState<EditorData[]>([]);
  const [activeEditor, setActiveEditor] = useState<string>();
  const [editing, setEditing] = useState(false);

  if (!editorDocument) {
    return null;
  }

  const pageTitle = editorDocument.metaData.title;

  const hasActiveEditor = activeEditor !== null;

  const documentMouseDown = (e) => {
    if (editing || hasActiveEditor) {
      return;
    }
    const { offsetTop, offsetLeft } = contentRef.current;

    const { clientX, clientY } = e;

    const editorData = new EditorData(
      getUUID(),
      new ElementPosition(
        clientX - offsetLeft,
        clientY - offsetTop + settings.sizes.editorHeaderHeight
      ),
      e.target
    );
    setActiveEditor(editorData.uuid);
    setEditors((prevEditors) => [...prevEditors, editorData]);
  };
  const deleteEditor = (editorUuid) => {
    const newEditors = editors.filter((editor) => editor.uuid !== editorUuid);
    setEditors(newEditors);
    setActiveEditor(null);
    setEditing(false);
  };
  const editorElements = editors.map((editor) => (
    <Editor
      isActive={activeEditor === editor.uuid}
      key={editor.uuid as ReactText}
      setEditing={setEditing}
      editorData={editor}
      currentIncrement={20}
      setActiveEditor={setActiveEditor}
      deleteEditor={deleteEditor}
    />
  ));
  return (
    <Document
      hasActiveEditor={hasActiveEditor}
      onMouseUp={() => setActiveEditor(null)}
    >
      <PageTitle
        value={pageTitle}
        onChange={(newValue) =>
          onChangeTitle(editorDocument.metaData.uuid, newValue)
        }
      >
        <h1>{pageTitle}</h1>
      </PageTitle>
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
