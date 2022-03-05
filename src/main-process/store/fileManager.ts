import EditorDocument from 'Models/EditorDocument';
import DocumentMetadata from 'Models/DocumentMetadata';
import * as jetpack from 'fs-jetpack';

const filePath = './documents-db';
const documentWriter = jetpack.cwd('./documents-db');

const makeFileName = (fileName: string) => `${fileName}.json`;

export const saveFile = (fileName: string, content: any) => {
  documentWriter.write(makeFileName(fileName), content || '');
};

export const getFile = (fileName: string) => {
  return documentWriter.read(makeFileName(fileName), 'json');
};

export const overWriteFile = (
  oldFileName: string,
  newFileName: string,
  content: any
) => {
  if (oldFileName !== newFileName) {
    console.log(`Renaming ${oldFileName} to ${newFileName}`);
    documentWriter.rename(makeFileName(oldFileName), makeFileName(newFileName));
  }
  console.log(`Overwriting file ${newFileName}`);
  documentWriter.file(makeFileName(newFileName), { content: content || '' });
};
