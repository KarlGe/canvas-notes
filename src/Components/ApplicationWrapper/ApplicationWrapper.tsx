import Page from 'Components/Page';
import Sidebar from 'Components/Sidebar/Sidebar';
import EditorDocument from 'Models/EditorDocument';
import DocumentMetadata from 'Models/DocumentMetadata';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ipcMessages from 'Helpers/ipcMessages';
import { IPCRender } from 'Helpers/ipcRenderer';
import { useDebouncedEffect } from 'Hooks/useDebouncedEffect';
import { useDocumentHandler } from 'Hooks/useDocumentHandler';

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
`;

export const ApplicationWrapper = (props: {}) => {
  const { documents, currentDocument, onOpenDocument } = useDocumentHandler();

  const documentMetdata = currentDocument ? currentDocument.metaData : null;

  const onAddDocument = () => {
    // const documentMetadata = new DocumentMetadata();
    // setDocuments([...documents, documentMetadata]);
    // const newDocument = new EditorDocument(documentMetadata);
    // setCurrentDocument(newDocument);
    // IPCRender.saveDocument(newDocument);
  };

  const onChangeTitle = (
    documentToChange: EditorDocument,
    newTitle: string
  ) => {
    // const newDocuments = [...documents];
    // const newDocument = { ...documentToChange };
    // newDocument.metaData.title = newTitle;
    // const documentIndex = documents.findIndex(
    //   (document) => document.uuid === documentToChange.metaData.uuid
    // );
    // newDocuments[documentIndex] = newDocument.metaData;
    // setDocuments(newDocuments);
  };

  return (
    <Wrapper>
      <Sidebar documents={documents} addDocument={onAddDocument} onOpenDocument={onOpenDocument}/>
      <Page
        key={documentMetdata ? documentMetdata.uuid : null}
        editorDocument={currentDocument}
        onChangeTitle={onChangeTitle}
      />
    </Wrapper>
  );
};
