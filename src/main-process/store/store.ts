import { DocumentList, DatabaseList } from 'Models/core/Types';
const { ipcMain } = require('electron');
import EditorDocument from 'Models/app/EditorDocument';
import DocumentMetadata from 'src/Models/app/DocumentMetadata';
import { saveFile } from './fileManager';

var LinvoDB = require('linvodb3');

const path = './documents-db/.db';

LinvoDB.dbPath = path;
const schema = {};
const modelName = 'doc';
const options = {};

export const DocumentDb = new LinvoDB(modelName, schema, options); // New model; Doc is the constructor

const makeDummyData = () => {
  const dummyDocs = [
    new DocumentMetadata('Test 1'),
    new DocumentMetadata('Test 2'),
    new DocumentMetadata('Test 3'),
    new DocumentMetadata('Test 4'),
  ];

  const child = dummyDocs[2];
  const parent = dummyDocs[0];

  parent.title = 'Test Parent';
  child.path += `${parent.title}/`;

  parent.isDirectory = true;

  dummyDocs.forEach((documentMetaData, index) => {
    saveFile(
      documentMetaData.path,
      documentMetaData.title,
      documentMetaData.isDirectory,
      new EditorDocument(documentMetaData)
    );
  });

  DocumentDb.insert(dummyDocs, (err, newDocs) => {
    console.log('Done!');
    console.log(newDocs);
  });
};

export async function setupDb() {
  DocumentDb.findOne({}, (err, results) => {
    console.log(results);
    if (!results) {
      makeDummyData();
    }
  });
}

// TODO update for Linvo
export async function saveDocuments(
  db,
  documentData: DocumentMetadata[]
): Promise<any> {
  return db.PUT(documentData, { storeVectors: true });
}

// TODO update for Linvo
export async function saveDocument(
  db,
  documentData: DocumentMetadata
): Promise<any> {
  return saveDocuments(db, [documentData]);
}

// TODO update for Linvo
export async function getDocument(db, uuid: string): Promise<DocumentMetadata> {
  return new Promise((resolve) => {
    resolve({} as DocumentMetadata);
    db.get(uuid, (err, value) => {
      resolve(value);
    });
  });
}

export async function getAllDocuments(db, path: string) {
  return new Promise<DocumentList>((resolve) => {
    DocumentDb.find({ path: '/' }, (err, results) => {
      resolve(results);
    });
  });
}
