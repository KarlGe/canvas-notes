import EditorDocument from 'Models/EditorDocument';
import DocumentMetadata from './DocumentMetadata';

export interface DocumentList {
  [key: string]: DocumentMetadata;
}
export interface DatabaseList {
  key: string;
  value: EditorDocument;
}
