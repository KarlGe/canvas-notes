import Page from 'Components/Page';
import Sidebar from 'Components/Sidebar/Sidebar';
import EditorDocument from 'Models/EditorDocument';
import DocumentMetadata from 'Models/DocumentMetadata';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
`;

export const ApplicationWrapper = (props: {}) => {
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [currentDocument, setCurrentDocument] = useState(null);

  useEffect(() => {}, []);

  const onAddDocument = () => {
    const documentMetadata = new DocumentMetadata();
    setDocuments([...documents, documentMetadata]);
    setCurrentDocument(new EditorDocument(documentMetadata));
  };
  
  const onChangeTitle = (uuid: string, newTitle: string) => {
    const newDocuments = [...documents];
    const documentIndex = documents.findIndex(document => document.uuid === uuid);
    newDocuments[documentIndex].title = newTitle;
    setDocuments(newDocuments);
  }

  return (
    <Wrapper>
      <Sidebar documents={documents} addDocument={onAddDocument} />
      <Page
        key={currentDocument ? currentDocument.uuid : null}
        editorDocument={currentDocument}
        onChangeTitle={onChangeTitle}
      />
    </Wrapper>
  );
};
