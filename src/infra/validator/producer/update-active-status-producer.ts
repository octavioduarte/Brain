import joi from "joi";
import { DocumentType } from "@/utils";
import { Validator } from "@/data/protocols";

export class UpdateActiveStatusProducerValidator implements Validator {
  private schema = joi.object({
    document: joi.string().required(),
    document_type: joi
      .string()
      .valid(DocumentType.CPF, DocumentType.CNPJ)
      .required(),
    new_status: joi.boolean().required()

  });

  validate(fields: unknown): string | undefined {
    const validationResult = this.schema.validate(fields);
    return validationResult?.error?.details[0]?.message;
  }
}