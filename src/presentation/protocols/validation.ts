export interface Validation {
  validate: (fields: unknown) => Error | null;
}