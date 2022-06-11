import Page from 'Components/Page';
import Sidebar from 'Components/Sidebar/Sidebar';
import EditorDocument from 'Models/app/EditorDocument';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDocumentHandler } from 'Hooks/useDocumentHandler';
import { MousePosition } from './MousePosition';
import EditorData from 'Models/app/EditorData';
import DocumentMetadata from 'src/Models/app/DocumentMetadata';

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
`;

export const ApplicationWrapper = (props: {}) => {
  const {
    documentList,
    currentDocument,
    onOpenDocument,
    onCreateDocument,
    onSaveDocument,
  } = useDocumentHandler();

  const documentMetdata = currentDocument ? currentDocument.metaData : null;

  const onChangeTitle = (
    documentToChange: EditorDocument,
    newTitle: string
  ) => {
    const newMetaData = {
      ...documentToChange.metaData,
      title: newTitle,
    } as DocumentMetadata;
    onSaveDocument(new EditorDocument(newMetaData, documentToChange.editors));
  };

  const onContentSave = (
    documentToSave: EditorDocument,
    newContent: EditorData[]
  ) => {
    onSaveDocument(new EditorDocument(documentToSave.metaData, newContent));
  };

  const documents = documentList ? Object.values(documentList) : [];

  return (
    <Wrapper>
      <MousePosition />
      <Sidebar
        documents={documents}
        addDocument={onCreateDocument}
        onOpenDocument={onOpenDocument}
      />
      <Page
        key={documentMetdata ? documentMetdata.uuid : null}
        editorDocument={currentDocument}
        onChangeTitle={onChangeTitle}
        onContentSave={onContentSave}
      />
    </Wrapper>
  );
};
