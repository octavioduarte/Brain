import { PrismaClient } from "@prisma/client";
import { ProducerDB } from "@/domain/models";
import { AddUserRepository, LoadProducerByDocumentRepository } from "@/data/protocols";

export class ProducerRepository implements AddUserRepository , LoadProducerByDocumentRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  
  async save(params: AddUserRepository.Param): Promise<AddUserRepository.Result> {
    const { id } = await this.prismaClient.producer.create({ data: params });
    return id;
  }

  async loadByDocument(documentNumber: string): Promise<LoadProducerByDocumentRepository.Result> {
    const producer = await this.prismaClient.producer.findUnique({ where: { document: documentNumber}})
    return producer;
  }
}
