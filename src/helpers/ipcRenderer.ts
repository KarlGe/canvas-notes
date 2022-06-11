import { ipcRenderer } from 'electron';
import DatabaseDocument from 'Models/database/DatabaseDocument';
import EditorDocument from 'Models/app/EditorDocument';
import { DocumentList } from 'Models/core/Types';
import ipcMessages from './ipcMessages';

export class IPCRender {
  static async sendMessage<T = any>(
    messageName,
    responseName,
    value
  ): Promise<T> {
    return new Promise<T>((resolve) => {
      ipcRenderer.once(responseName, (event, arg) => {
        resolve(arg);
      });
      ipcRenderer.send(messageName, value);
    });
  }
  public static async getDocument(uuid: string): Promise<EditorDocument> {
    return this.sendMessage<DatabaseDocument>(
      ipcMessages.getDocumentMessage,
      ipcMessages.getDocumentReply,
      uuid
    ).then((result) => EditorDocument.ParseDatabaseDocument(result));
  }
  public static async getAllDocuments(): Promise<DocumentList> {
    return this.sendMessage(
      ipcMessages.getAllMessage,
      ipcMessages.getAllReply,
      null
    );
  }
  public static async saveDocument(document: EditorDocument): Promise<string> {
    return this.sendMessage(
      ipcMessages.saveDocumentMessage,
      ipcMessages.saveDocumentReply,
      EditorDocument.CreateSaveAbleDocument(document)
    );
  }
}
