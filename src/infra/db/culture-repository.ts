import { PrismaClient } from "@prisma/client";
import { LoadAllCulturesRepository } from "@/data/protocols";

export class CultureRepository implements LoadAllCulturesRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async loadAll(): Promise<LoadAllCulturesRepository.Result[]> {
    return (await this.prismaClient.culture.findMany({
      select: { id: true, description: true },
    })) as unknown as LoadAllCulturesRepository.Result[];
  }
}