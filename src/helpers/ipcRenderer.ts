import { ipcRenderer } from 'electron';
import EditorDocument from 'Models/EditorDocument';
import ipcMessages from './ipcMessages';

export class IPCRender {
  static async sendMessage(messageName, responseName, value): Promise<any> {
    return new Promise((resolve) => {
      ipcRenderer.once(responseName, (event, arg) => {
        resolve(arg);
      });
      ipcRenderer.send(messageName, value);
    });
  }
  public static async getDocument(uuid: string): Promise<EditorDocument> {
    return this.sendMessage(
      ipcMessages.getDocumentMessage,
      ipcMessages.getDocumentReply,
      uuid
    );
  }
  public static async getAllDocuments(): Promise<EditorDocument[]> {
    return this.sendMessage(
      ipcMessages.getAllMessage,
      ipcMessages.getAllReply,
      null
    );
  }
  public static async saveDocument(document: EditorDocument) {
    return this.sendMessage(
      ipcMessages.saveDocumentMessage,
      ipcMessages.saveDocumentReply,
      document
    );
  }
}
