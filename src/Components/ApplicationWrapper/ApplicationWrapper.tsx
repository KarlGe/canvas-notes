import Page from 'Components/Page';
import Sidebar from 'Components/Sidebar/Sidebar';
import EditorDocument from 'Models/EditorDocument';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDocumentHandler } from 'Hooks/useDocumentHandler';

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
    const newDocument = { ...documentToChange };
    newDocument.metaData.title = newTitle;
    onSaveDocument(newDocument);
  };

  const documents = documentList ? Object.values(documentList) : [];

  return (
    <Wrapper>
      <Sidebar
        documents={documents}
        addDocument={onCreateDocument}
        onOpenDocument={onOpenDocument}
      />
      <Page
        key={documentMetdata ? documentMetdata.uuid : null}
        editorDocument={currentDocument}
        onChangeTitle={onChangeTitle}
      />
    </Wrapper>
  );
};
