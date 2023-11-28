export interface LoadMetricsRepository {
  loadMetrics: () => Promise<LoadMetricsRepository.Result[]>;
}
export namespace LoadMetricsRepository {
  export type Result = {
    area: number;
    state_uf: string;
    arable_area: number;
    vegetation_area: number;
    culture: CulturesMetrics[];
  };

  export type CulturesMetrics = {
    area: number;
    culture: {
      id: number;
      description: string;
    };
  };
}
