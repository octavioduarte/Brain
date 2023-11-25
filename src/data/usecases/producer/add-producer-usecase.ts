import { AddProducer } from "@/domain/usecases/producer";
import { AddUserRepository } from "@/data/protocols/producer";

export class AddProducerUseCase implements AddProducer {
   constructor (
       private readonly addProducerRepository: AddUserRepository
   ) {} 

  async add(param: AddProducer.Param): Promise<AddProducer.Result> {
      const producerDB = await this.addProducerRepository.save(param)
      return producerDB
  }
}