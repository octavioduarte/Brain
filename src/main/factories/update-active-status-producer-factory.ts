import { PrismaClient } from "@prisma/client";
import { ProducerRepository } from "@/infra/db";
import { Controller } from "@/presentation/protocols";
import { UpdateActiveStatusUseCase } from "@/data/usecases";
import { UpdateActiveStatusController } from "@/presentation/controllers";
import { UpdateActiveStatusValidateUseCase } from "@/data/usecases/validations/update-active-status-validate";
import { CnpjValidator, CpfValidator } from "@/presentation/helpers";
import { UpdateActiveStatusProducerValidator } from "@/infra/validator";

export const makeUpdateActiveStatusProducerController = (): Controller => {
  const producerRepository = new ProducerRepository(new PrismaClient())
  const updateActiveStatusUseCase = new UpdateActiveStatusUseCase(producerRepository, producerRepository);
  return new UpdateActiveStatusController(
    updateActiveStatusUseCase,
    new UpdateActiveStatusValidateUseCase(
      new CpfValidator(),
      new CnpjValidator(),
      new UpdateActiveStatusProducerValidator()
      )
    );
};
