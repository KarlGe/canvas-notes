import { settings } from 'Config/baseConfig';
import DocumentMetadata from 'Models/DocumentMetadata';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
  background-color: ${settings.colors.documentColor};
  padding: 1rem;
`;

interface SidebarProps {
  documents: DocumentMetadata[];
  addDocument: () => void;
}

export default function Sidebar(props: SidebarProps): ReactElement {
  const { documents, addDocument } = props;
  return (
    <SidebarWrapper>
      <p>Test</p>
      <ul>
        {documents.map((metaData) => (
          <li>{metaData.title}</li>
        ))}
      </ul>
      <button type="button" onClick={addDocument}>
        Add document
      </button>
    </SidebarWrapper>
  );
}
