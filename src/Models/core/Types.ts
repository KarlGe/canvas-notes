import EditorDocument from '../app/EditorDocument';
import DocumentMetadata from '../app/DocumentMetadata';

export interface DocumentList {
  [key: string]: DocumentMetadata;
}
export interface DatabaseList {
  key: string;
  value: DocumentMetadata;
}
