export class DocumentNotFoundError extends Error {
    constructor(entityName: string) {
      super(`Document ${entityName} not found.`);
      this.name = "DocumentNotFoundError";
    }
  }