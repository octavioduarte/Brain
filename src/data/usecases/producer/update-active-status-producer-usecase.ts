import { DocumentNotFoundError } from "@/domain/errors";
import { UpdateActiveStatusProducer } from "@/domain/usecases";
import { LoadProducerByDocumentRepository, UpdateActiveStatusProducerRepository } from "@/data/protocols";

export class UpdateActiveStatusUseCase implements UpdateActiveStatusProducer   {
  constructor(
    private readonly updateProducerStatus: UpdateActiveStatusProducerRepository,
    private readonly loadProducerByDocumentRepository: LoadProducerByDocumentRepository
  ){}

  async updateActiveStatusProducer(documentNumber: string, newStatus: boolean) {
    const producerDB = await this.loadProducerByDocumentRepository.loadByDocument(documentNumber)

    if (!producerDB) {
      throw new DocumentNotFoundError(documentNumber)
    }


    const  { active, name, document } = await this.updateProducerStatus.updateActiveStatusProducer(documentNumber, newStatus)
    return { active, name, document}
  }
}
