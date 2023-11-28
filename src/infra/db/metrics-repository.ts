import { PrismaClient } from "@prisma/client";
import { LoadMetricsRepository } from "@/data/protocols";

export class MetricsRepository implements LoadMetricsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async loadMetrics(): Promise<LoadMetricsRepository.Result[]> {
    return await this.prismaClient.farm.findMany({
      where: {
        producer: {
          active: true
        }
      },
      select: {
        area: true,
        state_uf: true,
        arable_area: true,
        vegetation_area: true,
        culture: {
          select: {
            area: true,
            culture: {
              select: {
                id: true,
                description: true
              }
            },
          },
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      },      
    }) as unknown as LoadMetricsRepository.Result[];
  }
}
