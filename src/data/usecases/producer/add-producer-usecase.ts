import { AddUserRepository } from "@/data/protocols";
import { AddProducer } from "@/domain/usecases/producer";
export class AddProducerUseCase implements AddProducer {
   constructor (
       private readonly addProducerRepository: AddUserRepository
   ) {} 

  async add(param: AddProducer.Param): Promise<AddProducer.Result> {
      const producerDB = await this.addProducerRepository.save(param)
      return producerDB
  }
}