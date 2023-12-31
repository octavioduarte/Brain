import { PrismaClient } from "@prisma/client";
import { Controller } from "@/presentation/protocols";
import { AddProducerUseCase } from "@/data/usecases/producer";
import {
  ProducerRepository,
  CultureFarmRepository,
  FarmRepository,
  CultureRepository,
} from "@/infra/db";
import { AddProducerController } from "@/presentation/controllers/producer/add-producer-controller";
import { AddProducerValidateUseCase } from "@/data/usecases/validations/add-producer-validate";
import { AddProducerValidator } from "@/infra/validator/producer";
import {
  CnpjValidator,
  CpfValidator,
  CalcSizeAreaValidator,
  CheckMatchBetweenCultureFarmAndCulturesDBValidator,
} from "@/presentation/helpers/validators";
import { LoadAddressByZipCode } from "@/infra/remote";

export const makeAddProducerController = (): Controller => {
  const producerRepository = new ProducerRepository(new PrismaClient());
  const farmRepository = new FarmRepository(new PrismaClient());
  const cultureFarmRepository = new CultureFarmRepository(new PrismaClient());
  const cultureRepository = new CultureRepository(new PrismaClient());
  const loadAddressByZipCode = new LoadAddressByZipCode()
  const addProducerUseCase = new AddProducerUseCase(
    producerRepository,
    producerRepository,
    farmRepository,
    cultureFarmRepository,
    loadAddressByZipCode
  );

  return new AddProducerController(
    addProducerUseCase,
    new AddProducerValidateUseCase(
      new AddProducerValidator(),
      new CpfValidator(),
      new CnpjValidator(),
      new CalcSizeAreaValidator(),
      new CheckMatchBetweenCultureFarmAndCulturesDBValidator(),
      cultureRepository
    )
  );
};
