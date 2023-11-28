import { LoadMetrics } from "@/domain/usecases/metrics";
import { ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";


export class LoadMetricsController implements Controller {
  constructor(
    private readonly loadMetricsUseCase: LoadMetrics
  ) {}

  async handle(): Promise<HttpResponse> {
    try {
      const result = await this.loadMetricsUseCase.loadMetrics()
      return ok(result);
    } catch (error) {

      return serverError(error);
    }
  }
}