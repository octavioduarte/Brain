import { PrismaClient } from "@prisma/client";
import { Controller } from "@/presentation/protocols";
import { AddProducerUseCase } from "@/data/usecases/producer";
import {
  ProducerRepository,
  CultureFarmRepository,
  FarmRepository,
} from "@/infra/db";
import { AddProducerController } from "@/presentation/controllers/producer/add-producer-controller";
import { AddProducerValidateAdapter } from "@/data/usecases/validations/add-producer-validate";
import { AddProducerValidator } from "@/infra/validator/producer";

export const makeAddProducerController = (): Controller => {
  const producerRepository = new ProducerRepository(new PrismaClient());
  const farmRepository = new FarmRepository(new PrismaClient());
  const cultureFarmRepository = new CultureFarmRepository(new PrismaClient());
  const addProducerUseCase = new AddProducerUseCase(
    producerRepository,
    producerRepository,
    farmRepository,
    cultureFarmRepository
  );

  return new AddProducerController(
    addProducerUseCase,
    new AddProducerValidateAdapter(new AddProducerValidator())
  );
};
