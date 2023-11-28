import { PrismaClient } from "@prisma/client";
import { AddFarmRepository } from "@/data/protocols";

export class FarmRepository implements AddFarmRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async save(params: AddFarmRepository.Param): Promise<AddFarmRepository.Result> {
    const { id } = await this.prismaClient.farm.create({ data: params });
    return id;
  }
}
