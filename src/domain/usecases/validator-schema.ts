export interface ValidatorSchema {
  isValid: (fields: unknown) => string | undefined;
}