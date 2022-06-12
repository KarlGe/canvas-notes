import { getUUID } from 'Helpers/uuid';

export default class DocumentMetadata {
  _id: string;
  title: string;
  isDirectory: boolean;
  path: string;
  order: number;

  constructor(
    title: string = 'New Document',
    _id: string = null,
    path = undefined
  ) {
    this.title = title;
    this.path = path || '/';
  }
}
