import * as jetpack from 'fs-jetpack';
import DocumentMetadata from 'src/Models/app/DocumentMetadata';

const filePath = './documents-db';
const documentWriter = jetpack.cwd(filePath);

const makeFileName = (fileName: string) => `${fileName}.json`;

const createFullPath = (
  path: string = '',
  fileName: string,
  isDirectory: boolean
) => {
  let fullPath;
  if (isDirectory) {
    fullPath = `${path}${fileName}/${makeFileName('index')}`;
  } else {
    fullPath = `${path}${makeFileName(fileName)}`;
  }
  return fullPath.replace(/^\//, '');
};

export const saveFile = (
  path: string,
  fileName: string,
  isDirectory: boolean,
  content: any
) => {
  console.log(path, fileName, isDirectory);
  documentWriter.write(
    createFullPath(path, fileName, isDirectory),
    content || ''
  );
};

export const getFile = (
  path: string,
  fileName: string,
  isDirectory: boolean
) => {
  return documentWriter.read(
    createFullPath(path, fileName, isDirectory),
    'json'
  );
};

export const overWriteFile = (
  oldDocumentData: DocumentMetadata,
  newDocumentData: DocumentMetadata,
  content: any
) => {
  if (oldDocumentData.title !== newDocumentData.title) {
    console.log(
      `Renaming ${oldDocumentData.title} to ${newDocumentData.title}`
    );
    documentWriter.rename(
      makeFileName(oldDocumentData.title),
      makeFileName(newDocumentData.title)
    );
  }
  console.log(`Overwriting file ${newDocumentData.title}`);
  saveFile(
    newDocumentData.path,
    newDocumentData.title,
    newDocumentData.isDirectory,
    content
  );
};
