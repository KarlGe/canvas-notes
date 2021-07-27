import { IPCRender } from 'Helpers/ipcRenderer';
import DocumentMetadata from 'Models/DocumentMetadata';
import EditorDocument from 'Models/EditorDocument';
import { DocumentList } from 'Models/Types';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedEffect } from './useDebouncedEffect';

export const useDocumentHandler = () => {
  const [documentList, setDocumentList] = useState<DocumentList>(null);
  const [currentDocumentUUID, setCurrentDocumentUUID] =
    useState<string>(undefined);
  const [currentDocument, setCurrentDocument] =
    useState<EditorDocument>(undefined);

  const documentMetdata = currentDocument ? currentDocument.metaData : null;
  const documentTitle = documentMetdata ? documentMetdata.title : null;

  useEffect(() => {
    IPCRender.getAllDocuments().then((documents) => {
      setDocumentList(documents);
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

  const onSaveDocument = (document: EditorDocument) => {
    setDocumentList({ ...documentList, [document.metaData.uuid]: document.metaData });
    IPCRender.saveDocument(document);
  };

  const onCreateDocument = () => {
    const documentMetadata = new DocumentMetadata();
    const newDocument = new EditorDocument(documentMetadata);
    onSaveDocument(newDocument);
    setCurrentDocument(newDocument);
  };

  return {
    documentList,
    currentDocument,
    onOpenDocument,
    onCreateDocument,
    onSaveDocument,
  };
};
