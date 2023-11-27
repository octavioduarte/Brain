import { PrismaClient } from "@prisma/client";
import { AddUserRepository, UpdateActiveStatusProducerRepository, LoadProducerByDocumentRepository } from "@/data/protocols";
export class ProducerRepository implements AddUserRepository , LoadProducerByDocumentRepository, UpdateActiveStatusProducerRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  
  async save(params: AddUserRepository.Param): Promise<AddUserRepository.Result> {
    const { id } = await this.prismaClient.producer.create({ data: params });
    return id;
  }

  async loadByDocument(documentNumber: string): Promise<LoadProducerByDocumentRepository.Result> {
    const producer = await this.prismaClient.producer.findUnique({ where: { document: documentNumber}})
    return producer;
  }

  async updateActiveStatusProducer(documentNumber: UpdateActiveStatusProducerRepository.ParamDocument, newStatus: UpdateActiveStatusProducerRepository.ParamNewStatus){
    return await this.prismaClient.producer.update({ where: { document: documentNumber },  data: { active: newStatus }})
  }
}
