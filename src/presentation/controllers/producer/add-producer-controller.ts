import { ProducerModel } from "@/domain/models";
import { AddProducer } from "@/domain/usecases/producer";
import { badRequest, created, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class AddProducerController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addProducer: AddProducer
  ) {}

  async handle(
    requestParams: AddProducerController.Param
  ): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(requestParams);

      if (error) badRequest(error);

      const result = await this.addProducer.add(requestParams);
      return created(result);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace AddProducerController {
  export type Param = ProducerModel;
}
