import { IPCRender } from 'Helpers/ipcRenderer';
import DocumentMetadata from 'src/Models/app/DocumentMetadata';
import EditorDocument from 'Models/app/EditorDocument';
import { DocumentList } from 'Models/core/Types';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedEffect } from './useDebouncedEffect';

export const useDocumentHandler = () => {
  const [documentList, setDocumentList] = useState<DocumentList>(null);
  const [currentDocumentUUID, setCurrentDocumentUUID] =
    useState<string>(undefined);
  const [currentDocument, setCurrentDocument] =
    useState<EditorDocument>(undefined);
  const [shouldSave, setShouldSave] = useState<boolean>(false);

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
      if (currentDocument && shouldSave) {
        IPCRender.saveDocument(currentDocument).then((savedFileName) => {});
        setShouldSave(false);
      }
    },
    [currentDocument, documentTitle, shouldSave],
    500
  );

  const onOpenDocument = (metaData: DocumentMetadata) => {
    setCurrentDocumentUUID(metaData.uuid);
  };

  const onSaveDocument = async (document: EditorDocument) => {
    setDocumentList({
      ...documentList,
      [document.metaData.uuid]: document.metaData,
    });
    setShouldSave(true);
    setCurrentDocument(document);
  };

  const onCreateDocument = async () => {
    const documentMetadata = new DocumentMetadata();
    const newDocument = new EditorDocument(documentMetadata);
    return onSaveDocument(newDocument);
  };

  return {
    documentList,
    currentDocument,
    onOpenDocument,
    onCreateDocument,
    onSaveDocument,
  };
};
