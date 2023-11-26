import { Validator } from "@/data/protocols";
import { ValidatorSchema } from "@/domain/usecases";

export class AddProducerValidateAdapter implements ValidatorSchema {
  constructor(private readonly addProducerValidator: Validator) {}

  isValid(fields: unknown): string | undefined {
    const error = this.addProducerValidator.validate(fields);
    return error;
  }
}