import { PrismaClient } from "@prisma/client";
import { MetricsRepository } from "@/infra/db";
import { Controller } from "@/presentation/protocols";
import { LoadMetricsUseCase } from "@/data/usecases";
import { LoadMetricsController } from "@/presentation/controllers";

export const makeLoadMetricsController = (): Controller => {
  return new LoadMetricsController(
    new LoadMetricsUseCase(new MetricsRepository(new PrismaClient()))
  );
};
