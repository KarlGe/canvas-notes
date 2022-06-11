import { DocumentList, DatabaseList } from 'Models/core/Types';
const { ipcMain } = require('electron');
var levelup = require('levelup');
var leveldown = require('leveldown');
var encode = require('encoding-down');
import EditorDocument from 'Models/app/EditorDocument';
import DocumentMetadata from 'src/Models/app/DocumentMetadata';
import { saveFile } from './fileManager';

const path = './documents-db/.db';

export var db = levelup(encode(leveldown(path), { valueEncoding: 'json' }));

export async function saveDocument(
  db,
  documentId: string,
  documentData: DocumentMetadata
): Promise<any> {
  return db.put(documentId, documentData);
}

export async function getDocument(db, uuid: string): Promise<DocumentMetadata> {
  return new Promise((resolve) => {
    db.get(uuid, (err, value) => {
      resolve(value);
    });
  });
}

export async function getAllDocuments(db) {
  return new Promise<DocumentList>((resolve) => {
    var docs: DocumentList = {};
    db.createReadStream()
      .on('data', (data: DatabaseList) => {
        docs[data.key] = data.value;
      })
      .on('error', function (err) {
        console.log('Oh my!', err);
      })
      .on('end', () => {
        if (Object.keys(docs).length > 0) {
          resolve(docs);
        } else {
          const dummyDocs = [
            new DocumentMetadata('Test 1'),
            new DocumentMetadata('Test 2'),
            new DocumentMetadata('Test 3'),
            new DocumentMetadata('Test 4'),
          ];

          const child = dummyDocs[2];
          const parent = dummyDocs[0];
          parent.title = 'Test Parent';
          parent.isDirectory = true;

          child.path = `${parent.title}/`;

          dummyDocs.forEach((documentMetaData, index) => {
            saveFile(
              documentMetaData.path,
              documentMetaData.title,
              documentMetaData.isDirectory,
              new EditorDocument(documentMetaData)
            );
          });

          const ops = dummyDocs.map((documentMetaData) => ({
            type: 'put',
            key: documentMetaData.uuid,
            value: documentMetaData,
          }));

          db.batch(ops, function (err) {
            if (err) {
              console.log('Ooops!', err);
              return;
            }
            console.log('Documents stored!');
          });
          docs[dummyDocs[0].uuid] = dummyDocs[0];
          docs[dummyDocs[1].uuid] = dummyDocs[1];
          docs[dummyDocs[2].uuid] = dummyDocs[2];
          docs[dummyDocs[3].uuid] = dummyDocs[3];
          resolve(docs);
        }
      });
  });
}
