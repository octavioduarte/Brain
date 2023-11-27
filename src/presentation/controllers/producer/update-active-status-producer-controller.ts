import { DocumentNotFoundError, SchemaError } from "@/domain/errors";
import { badRequest, ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { UpdateActiveStatusProducer, ValidatorSchema } from "@/domain/usecases";

export class UpdateActiveStatusController implements Controller {
  constructor(
    private readonly updateActiveStatusProducer: UpdateActiveStatusProducer,
    private readonly updateActiveStatusValidateAdapter: ValidatorSchema
  ) {}

  async handle(requestParams: DeleteProducerController.Param): Promise<HttpResponse> {
    try {

      const schemaErrors = await this.updateActiveStatusValidateAdapter.isValid(requestParams)

      if (schemaErrors) return badRequest(new SchemaError(schemaErrors))

      const result = await this.updateActiveStatusProducer.updateActiveStatusProducer(requestParams.document, requestParams.new_status)
      return ok(result)
    } catch (error) {
      if (error instanceof DocumentNotFoundError) {
        return badRequest(error)
      }
      return serverError(error);
    }
  }
}

export namespace DeleteProducerController {
  export type Param = {
    document: string
    document_type: string
    new_status: boolean
  };
}
