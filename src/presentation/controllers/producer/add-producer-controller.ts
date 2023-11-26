import { ProducerModel } from "@/domain/models";
import { ValidatorSchema } from "@/domain/usecases";
import { AddProducer } from "@/domain/usecases/producer";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { DuplicateDocumentError, SchemaError } from "@/domain/errors";
import { badRequest, created, serverError } from "@/presentation/helpers";
export class AddProducerController implements Controller {
  constructor(
    private readonly addProducer: AddProducer,
    private readonly addProducerValidateAdapter: ValidatorSchema
  ) {}

  async handle(requestParams: AddProducerController.Param): Promise<HttpResponse> {
    try {
      const schemaErrors = this.addProducerValidateAdapter.isValid(requestParams)

      if (schemaErrors) return badRequest(new SchemaError(schemaErrors))

      const result = await this.addProducer.add(requestParams);
      return created(result);
    } catch (error) {
      if (error instanceof DuplicateDocumentError) {
        return badRequest(error)
      }
      return serverError(error);
    }
  }
}

export namespace AddProducerController {
  export type Param = ProducerModel;
}
