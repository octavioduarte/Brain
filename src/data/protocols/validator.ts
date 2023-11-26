export interface Validator {
  validate: (fields: unknown) => string | undefined;
}