import { Validator } from "@/data/protocols";
import { ProducerModel } from "@/domain/models";
import { ValidatorSchema } from "@/domain/usecases";

export class AddProducerValidateUseCase implements ValidatorSchema {
  constructor(
    private readonly addProducerValidator: Validator,
    private readonly cpfValidator: Validator
  ) {}

  isValid(fields: ProducerModel): string | undefined {
   for (const { validatorHandle, fieldValidate} of this.pipeValidators(fields)) {
      const error = validatorHandle.validate(fieldValidate)
      if (error) return error
   }
  }

  pipeValidators(fields: ProducerModel): {validatorHandle: Validator, fieldValidate: unknown}[] {
    return   [
      { validatorHandle: this.cpfValidator, fieldValidate: fields.document },
      { validatorHandle: this.addProducerValidator, fieldValidate: fields }
    ];
  }
}