const { ipcMain } = require('electron');
var levelup = require('levelup');
var leveldown = require('leveldown');
var encode = require('encoding-down');
import EditorDocument from 'Models/EditorDocument';
import ipcMessages from 'Helpers/ipcMessages';
import DocumentMetadata from 'Models/DocumentMetadata';

export async function setupStore() {
  var db = levelup(
    encode(leveldown('./documents-db'), { valueEncoding: 'json' })
  );

  console.log('Setting up DB');

  ipcMain.on(ipcMessages.getAllMessage, async (event, arg) => {
    const docs = await getAllDocuments(db);
    event.reply(ipcMessages.getAllReply, docs);
  });

  ipcMain.on(ipcMessages.saveDocumentMessage, (event, arg) => {
    console.log(arg);
    event.reply(ipcMessages.saveDocumentReply, 'Saved!');
  });

  ipcMain.on(ipcMessages.getDocumentMessage, async (event, arg) => {
    const document = await getDocument(db, arg);
    event.reply(ipcMessages.getDocumentReply, document);
  });
}

async function getDocument(db, uuid: string) {
  return new Promise((resolve) => {
    db.get(uuid, (err, value) => {
      resolve(value);
    });
  });
}

async function getAllDocuments(db) {
  return new Promise((resolve) => {
    var docs = [];
    db.createValueStream()
      .on('data', (data) => {
        docs.push(data);
      })
      .on('end', () => {
        if (docs.length > 0) {
          resolve(docs);
        } else {
          const dummyDocs = [
            new EditorDocument(new DocumentMetadata('Test 1')),
            new EditorDocument(new DocumentMetadata('Test 2')),
            new EditorDocument(new DocumentMetadata('Test 3')),
            new EditorDocument(new DocumentMetadata('Test 4')),
          ];
          dummyDocs[2].metaData.parentId = dummyDocs[0].metaData.uuid;
          db.batch()
            .put(dummyDocs[0].metaData.uuid, dummyDocs[0])
            .put(dummyDocs[1].metaData.uuid, dummyDocs[1])
            .put(dummyDocs[2].metaData.uuid, dummyDocs[2])
            .put(dummyDocs[3].metaData.uuid, dummyDocs[3])
            .write(() => resolve('Added dummy data'));
          resolve(dummyDocs);
        }
      });
  });
}
