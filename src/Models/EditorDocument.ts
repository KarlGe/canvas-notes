import DatabaseDocument, { DatabaseEditor } from './DatabaseDocument';
import DocumentMetadata from './DocumentMetadata';
import EditorData from './EditorData';
import ElementPosition from './ElementPosition';

export default class EditorDocument {
  metaData: DocumentMetadata;
  editors: EditorData[];

  constructor(metaData: DocumentMetadata = null, editors = undefined) {
    if (metaData == null) {
      this.metaData = new DocumentMetadata('New Document');
    } else {
      this.metaData = metaData;
    }
    this.editors = editors;
  }
  static CreateSaveAbleDocument = (
    document: EditorDocument
  ): DatabaseDocument => {
    return {
      ...document,
      editors: document.editors.map((editor) => {
        const stringifiedContent = JSON.stringify(editor.content);
        return { ...editor, content: stringifiedContent };
      }),
    };
  };
  static ParseDatabaseDocument = (
    documentData: DatabaseDocument
  ): EditorDocument => {
    return {
      ...documentData,
      editors: documentData.editors?.map((editor) =>
        EditorData.FromDatabaseEditor(editor)
      ),
    };
  };
}
