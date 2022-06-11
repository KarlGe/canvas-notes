import { getFile, overWriteFile, saveFile } from './fileManager';
const { ipcMain } = require('electron');
import ipcMessages from 'Helpers/ipcMessages';
import EditorDocument from 'Models/app/EditorDocument';
import { db, getAllDocuments, getDocument, saveDocument } from './store';

export async function setupMessageHandler() {
  ipcMain.on(ipcMessages.getAllMessage, async (event, arg) => {
    const docs = await getAllDocuments(db);
    event.reply(ipcMessages.getAllReply, docs);
  });

  ipcMain.on(
    ipcMessages.saveDocumentMessage,
    async (event, newDocument: EditorDocument) => {
      const storedDocumentData = await getDocument(
        db,
        newDocument.metaData.uuid
      );

      newDocument.metaData.filePath = newDocument.metaData.title;

      if (storedDocumentData?.filePath) {
        overWriteFile(
          storedDocumentData.filePath,
          newDocument.metaData.title,
          newDocument
        );
      } else {
        saveFile(newDocument.metaData.title, newDocument);
      }

      saveDocument(db, storedDocumentData.uuid, newDocument.metaData).then(
        (err) => {
          event.reply(
            ipcMessages.saveDocumentReply,
            newDocument.metaData.filePath
          );
        }
      );
    }
  );

  ipcMain.on(ipcMessages.getDocumentMessage, async (event, arg) => {
    const documentMetaData = await getDocument(db, arg);
    if (documentMetaData.filePath) {
      const file = await getFile(documentMetaData.filePath);
      event.reply(ipcMessages.getDocumentReply, file as EditorDocument);
    } else {
      event.reply(
        ipcMessages.getDocumentReply,
        new EditorDocument(documentMetaData)
      );
    }
  });
}
