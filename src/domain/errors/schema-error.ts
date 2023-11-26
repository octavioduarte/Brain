export class SchemaError extends Error {
  constructor(errorDetails: string) {
    super(errorDetails);
    this.name = "SchemaError";
  }
}