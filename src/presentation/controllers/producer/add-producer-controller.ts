import { ProducerModel } from "@/domain/models";
import { AddProducer } from "@/domain/usecases/producer";
import { created, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class AddProducerController implements Controller {
  constructor(
    private readonly addProducer: AddProducer
  ) {}

  async handle(
    requestParams: AddProducerController.Param
  ): Promise<HttpResponse> {
    try {
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
