import { getUUID } from 'Helpers/uuid';

export default class DocumentMetadata {
  uuid: string;
  title: string;

  constructor(title: string = 'New Document') {
    this.uuid = getUUID();
    this.title = title;
  }
}
