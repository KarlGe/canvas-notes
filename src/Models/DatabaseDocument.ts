import DocumentMetadata from './DocumentMetadata';

export interface IPosition {
  x: number;
  y: number;
}

export class DatabaseEditor {
  uuid: string;
  content: string;
  position: IPosition;
}

export default class DatabaseDocument {
  metaData: DocumentMetadata;
  editors: DatabaseEditor[];
}
