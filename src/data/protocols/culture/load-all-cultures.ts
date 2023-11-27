export interface LoadAllCulturesRepository {
  loadAll: () => Promise<LoadAllCulturesRepository.Result[]>;
}

export namespace LoadAllCulturesRepository {
  export type Result = {
    id: number;
    description: string;
  };
}
