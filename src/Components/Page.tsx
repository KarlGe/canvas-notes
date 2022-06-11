import React, { useRef, ReactText, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import EditorData from 'Models/app/EditorData';
import ElementPosition from 'Models/app/ElementPosition';
import { getUUID } from 'Helpers/uuid';
import CursorAddIcon from 'Assets/icons/cursor-add.inline.svg';
import Editor from './Editor/Editor';
import EditableField from './UI/EditableField/EditableField';
import { settings } from 'Config/baseConfig';
import EditorDocument from 'Models/app/EditorDocument';
import { Descendant } from 'slate';

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
  onChangeTitle: (changedDocument: EditorDocument, newTitle: string) => void;
  onContentSave: (
    documentToSave: EditorDocument,
    newContent: EditorData[]
  ) => void;
}
type EditorMap = { [key: string]: EditorData };

const createEditorMap = (editorDataList: EditorData[]) => {
  const map = {};
  editorDataList?.forEach((editorData) => (map[editorData.uuid] = editorData));
  return map;
};
function Page(props: PageProps) {
  const { editorDocument, onChangeTitle, onContentSave } = props;
  const contentRef = useRef(null);
  const [editors, setEditors] = useState<EditorMap>(() =>
    createEditorMap(editorDocument?.editors)
  );
  const [activeEditor, setActiveEditor] = useState<string>(null);
  const [editing, setEditing] = useState(false);
  const [parentOffset, setParentOffset] = useState(null);

  if (!editorDocument) {
    return null;
  }

  const pageTitle = editorDocument.metaData.title;

  const hasActiveEditor = activeEditor !== null;

  const documentMouseDown = (e) => {
    e.stopPropagation();
    if (editing || hasActiveEditor) {
      setActiveEditor(null);
      return;
    }

    const { pageX, pageY } = e;

    const editorData = new EditorData(
      getUUID(),
      new ElementPosition(pageX, pageY)
    );
    setActiveEditor(editorData.uuid);
    setEditors((prevEditors) => {
      const newMap = { ...prevEditors };
      newMap[editorData.uuid] = editorData;
      return newMap;
    });
  };
  useEffect(() => {
    const { offsetParent, offsetTop } = contentRef.current;
    const { offsetLeft } = offsetParent; // We have to get the X offset from the parent

    setParentOffset(
      new ElementPosition(
        offsetLeft * -1,
        (offsetTop - settings.sizes.editorHeaderHeight) * -1
      )
    );
  }, [contentRef.current]);

  const savePage = (document: EditorDocument, editors: EditorMap) => {
    setEditors(editors);
    onContentSave(document, Object.values(editors));
  };

  const deleteEditor = (editorUuid: string) => {
    const newEditors = { ...editors };
    delete newEditors[editorUuid];
    setActiveEditor(null);
    setEditing(false);
    savePage(editorDocument, newEditors);
  };

  const saveEditor = (editorData: EditorData) => {
    const newEditors = { ...editors };
    newEditors[editorData.uuid] = editorData;
    savePage(editorDocument, newEditors);
  };

  const editorElements = Object.values(editors).map((editor) => (
    <Editor
      isActive={activeEditor === editor.uuid}
      parentOffset={parentOffset}
      key={editor.uuid as ReactText}
      setEditing={setEditing}
      editorData={editor}
      currentIncrement={20}
      setActiveEditor={setActiveEditor}
      deleteEditor={deleteEditor}
      saveEditor={saveEditor}
    />
  ));

  return (
    <Document
      hasActiveEditor={hasActiveEditor}
      onMouseDown={() => setActiveEditor(null)}
    >
      <PageTitle
        value={pageTitle}
        onChange={(newValue) => onChangeTitle(editorDocument, newValue)}
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
