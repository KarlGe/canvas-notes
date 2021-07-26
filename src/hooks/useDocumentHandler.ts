import { IPCRender } from 'Helpers/ipcRenderer';
import DocumentMetadata from 'Models/DocumentMetadata';
import EditorDocument from 'Models/EditorDocument';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedEffect } from './useDebouncedEffect';

export const useDocumentHandler = () => {
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [currentDocumentUUID, setCurrentDocumentUUID] =
    useState<string>(undefined);
  const [currentDocument, setCurrentDocument] =
    useState<EditorDocument>(undefined);

  const documentMetdata = currentDocument ? currentDocument.metaData : null;
  const documentTitle = documentMetdata ? documentMetdata.title : null;

  useEffect(() => {
    console.log('Test');
    IPCRender.getAllDocuments().then((documents) => {
      console.log(documents);
      setDocuments(documents.map((document) => document.metaData));
    });
  }, []);

  useEffect(() => {
    if (currentDocumentUUID) {
      IPCRender.getDocument(currentDocumentUUID).then((document) => {
        setCurrentDocument(document);
      });
    }
  }, [currentDocumentUUID]);

  useDebouncedEffect(
    () => {
      if (currentDocument) {
        IPCRender.saveDocument(currentDocument);
      }
    },
    [currentDocument, documentTitle],
    500
  );

  const onOpenDocument = (metaData: DocumentMetadata) => {
    setCurrentDocumentUUID(metaData.uuid);
  };

  return { documents, currentDocument, onOpenDocument };
};
