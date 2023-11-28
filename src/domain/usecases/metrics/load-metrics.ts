export interface LoadMetrics {
  loadMetrics: () => Promise<LoadMetrics.Result>;
}

export namespace LoadMetrics {
  export type Result = {
    farms_total: number;
    farms_total_area_in_hct: number;
    farms_total_arable_area_in_hct: number;
    farms_total_vegetation_area_in_hct: number;
    farms_total_by_state: FarmsTotalByState;
    total_by_culture: TotalByCulture;
  };

  export type FarmsTotalByState = {
    [key: string]: {
      farms_total: number;
      farms_total_area_in_hct: number;
    };
  };

  export type TotalByCulture = {
    [key: string]: {
      total_occupation_in_hct: number;
    };
  };
}
