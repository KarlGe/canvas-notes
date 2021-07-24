import { ipcRenderer } from 'electron';
import ipcMessages from './ipcMessages';

export class IPCRender {
  public static async getAllDocuments() {
    console.log('Sending');

    ipcRenderer.once(ipcMessages.getAllReply, (event, arg) => {
      console.log(arg); // prints "pong"
    });
    ipcRenderer.send(ipcMessages.getAllMessage, 'ping');
  }
}
