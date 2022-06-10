import DocumentMetadata from './DocumentMetadata';

export interface IPosition {
  x: number;
  y: number;
}

export type databasePosition = [number, number];

export class DatabaseEditor {
  uuid: string;
  content: string;
  position: databasePosition;
}

export default class DatabaseDocument {
  metaData: DocumentMetadata;
  editors: DatabaseEditor[];
}
