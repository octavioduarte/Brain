export class DuplicateDocumentError extends Error {
  constructor(entityName: string) {
    super(`Document ${entityName} already exists.`);
    this.name = "DuplicateError";
  }
}