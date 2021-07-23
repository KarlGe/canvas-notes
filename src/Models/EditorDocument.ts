import DocumentMetadata from './DocumentMetadata';

export default class EditorDocument {
  metaData: DocumentMetadata;
  content: string;

  constructor(metaData: DocumentMetadata = null) {
    if (metaData == null) {
      this.metaData = new DocumentMetadata('New Document');
    } else {
      this.metaData = metaData;
    }
  }
}
