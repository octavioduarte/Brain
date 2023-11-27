export interface AddCultureFarmRepository {
  save: (params: AddCultureFarmRepository.Param) => Promise<AddCultureFarmRepository.Result>;
}
export namespace AddCultureFarmRepository {
  export type Param = {
    culture_id: number;
    area: number;
    farm_id: number;
  };
  export type Result = void;
}