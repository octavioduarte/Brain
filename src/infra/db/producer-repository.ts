import { PrismaClient } from "@prisma/client";
import { AddUserRepository } from "@/data/protocols";

export class ProducerRepository implements AddUserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  
  async save(params: AddUserRepository.Param): Promise<AddUserRepository.Result> {
    const { id } = await this.prismaClient.producer.create({ data: params });
    return id;
  }
}
