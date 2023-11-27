import { DocumentType } from "@/utils";
import { ProducerModel } from "@/domain/models";
import { ValidatorSchema } from "@/domain/usecases";
import { Validator } from "@/data/protocols";

export class UpdateActiveStatusValidateUseCase implements ValidatorSchema {
  constructor(
    private readonly cpfValidator: Validator,
    private readonly cnpjValidator: Validator,
    private readonly updateActiveStatusValidator: Validator,

  ) {}

  async isValid(fields: ProducerModel): Promise<string | undefined> {
    for (const { validatorHandle, fieldValidate } of this.pipeValidators(fields)) {
      const error = validatorHandle.validate(fieldValidate);
      if (error) return error;
    }
  }

  pipeValidators(
    fields: ProducerModel
  ): { validatorHandle: Validator; fieldValidate: unknown }[] {
    return [
      {validatorHandle: this.updateActiveStatusValidator, fieldValidate: fields},
      { validatorHandle: fields.document_type === DocumentType.CPF ? this.cpfValidator : this.cnpjValidator,
        fieldValidate: fields.document,
      },
    ];
  }
}
