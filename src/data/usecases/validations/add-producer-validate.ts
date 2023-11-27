import { Validator } from "@/data/protocols";
import { ProducerModel } from "@/domain/models";
import { ValidatorSchema } from "@/domain/usecases";
import { DocumentType } from "@/utils";

export class AddProducerValidateUseCase implements ValidatorSchema {
  constructor(
    private readonly addProducerValidator: Validator,
    private readonly cpfValidator: Validator,
    private readonly cnpjValidator: Validator,
    private readonly calcSizeAreaValidator: Validator
  ) {}

  isValid(fields: ProducerModel): string | undefined {
   for (const { validatorHandle, fieldValidate} of this.pipeValidators(fields)) {
      const error = validatorHandle.validate(fieldValidate)
      if (error) return error
   }
  }

  pipeValidators(fields: ProducerModel): {validatorHandle: Validator, fieldValidate: unknown}[] {
    return   [
      { 
        validatorHandle: fields.document_type === DocumentType.CPF ?  this.cpfValidator : this.cnpjValidator,
        fieldValidate: fields.document },
      { validatorHandle: this.addProducerValidator, fieldValidate: fields }, 
      { validatorHandle: this.calcSizeAreaValidator, fieldValidate: fields.farm}
    ];
  }
}