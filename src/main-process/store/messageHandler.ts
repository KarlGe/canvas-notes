import { getFile, overWriteFile, saveFile } from './fileManager';
const { ipcMain } = require('electron');
import ipcMessages from 'Helpers/ipcMessages';
import EditorDocument from 'Models/app/EditorDocument';
import {
  DocumentDb,
  getAllDocuments,
  getDocument,
  saveDocument,
} from './store';

export async function setupMessageHandler() {
  ipcMain.on(ipcMessages.getAllMessage, async (event, path: string) => {
    const docs = await getAllDocuments(DocumentDb, path);
    event.reply(ipcMessages.getAllReply, docs);
  });

  ipcMain.on(
    ipcMessages.saveDocumentMessage,
    async (event, newDocument: EditorDocument) => {
      const storedDocumentData = await getDocument(
        DocumentDb,
        newDocument.metaData._id
      );

      if (storedDocumentData?.path) {
        overWriteFile(storedDocumentData, newDocument.metaData, newDocument);
      } else {
        saveFile(
          newDocument.metaData.path,
          newDocument.metaData.title,
          newDocument.metaData.isDirectory,
          newDocument
        );
      }

      saveDocument(DocumentDb, newDocument.metaData).then((err) => {
        event.reply(ipcMessages.saveDocumentReply, newDocument.metaData.path);
      });
    }
  );

  ipcMain.on(ipcMessages.getDocumentMessage, async (event, arg) => {
    const documentMetaData = await getDocument(DocumentDb, arg);
    if (documentMetaData.path) {
      const file = await getFile(
        documentMetaData.path,
        documentMetaData.title,
        documentMetaData.isDirectory
      );
      event.reply(ipcMessages.getDocumentReply, file as EditorDocument);
    } else {
      event.reply(
        ipcMessages.getDocumentReply,
        new EditorDocument(documentMetaData)
      );
    }
  });
}
