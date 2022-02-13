import DocumentMetadata from './DocumentMetadata';
import EditorData from './EditorData';

export default class EditorDocument {
  metaData: DocumentMetadata;
  editors: EditorData[];

  constructor(metaData: DocumentMetadata = null) {
    if (metaData == null) {
      this.metaData = new DocumentMetadata('New Document');
    } else {
      this.metaData = metaData;
    }
  }
}
