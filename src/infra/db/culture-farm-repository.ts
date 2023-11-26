import { PrismaClient } from "@prisma/client";
import { AddCultureFarmRepository } from "@/data/protocols";

export class CultureFarmRepository implements AddCultureFarmRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async save(params: AddCultureFarmRepository.Param): Promise<AddCultureFarmRepository.Result> {
    await this.prismaClient.culture_farm.create({ data: params });
  }
}