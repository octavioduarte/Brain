export interface ValidatorSchema {
  isValid: (fields: unknown) => Promise<string | undefined>;
}