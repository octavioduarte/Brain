import joi from "joi";
import { DocumentType } from "@/utils";
import { Validator } from "@/data/protocols";
export class AddProducerValidator implements Validator {
  private schema = joi.object({
    name: joi.string().required(),
    document: joi.string().required(),
    document_type: joi
      .string()
      .valid(DocumentType.CPF, DocumentType.CNPJ)
      .required(),
    farm: joi
      .array()
      .items({
        name: joi.string().required(),
        zip_code: joi.string().required(),
        area: joi.number().strict().required(),
        arable_area: joi.number().strict().required(),
        vegetation_area: joi.number().strict().required(),
        cultures: joi
          .array()
          .items({
            id: joi.number().strict().required(),
            occupation_area: joi.number().strict().required(),
          })
          .required(),
      })
      .required(),
  });

  validate(fields: unknown): string | undefined {
    const validationResult = this.schema.validate(fields);
    return validationResult?.error?.details[0]?.message;
  }
}