export interface AddFarmRepository {
  save: (
    params: AddFarmRepository.Param
  ) => Promise<AddFarmRepository.Result>;
}
export namespace AddFarmRepository {
  export type Param = {
    producer_id: number;
    city: string;
    area: number;
    name: string;
    arable_area: number;
    state_uf: string;
    vegetation_area: number;
  };
  export type Result = number;
}