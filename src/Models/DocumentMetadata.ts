import { getUUID } from 'Helpers/uuid';

export default class DocumentMetadata {
  uuid: string;
  title: string;
  parentId: string;
  filePath: string;
  order: number;

  constructor(title: string = 'New Document', uuid: string = null, parentId: string = undefined) {
    this.title = title;
    this.parentId = parentId;
    if (uuid == null) {
      this.uuid = getUUID();
    }
  }
}
