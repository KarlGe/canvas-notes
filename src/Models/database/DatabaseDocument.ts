import DocumentMetadata from '../app/DocumentMetadata';
import { databasePosition } from './DatabaseTypes';

export class DatabaseEditor {
  uuid: string;
  content: string;
  position: databasePosition;
}

export default class DatabaseDocument {
  metaData: DocumentMetadata;
  editors: DatabaseEditor[];
}
