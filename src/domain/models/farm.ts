import { StateUf } from "./state-uf";
import { CultureFarmDB, CultureModel } from "./culture-farm";

export type FarmDB = {
  user_id: number;
  id: number;
  name: string;
  area: number;
  arable_area: number;
  state_uf_id: number;
  city: string;
  state_uf: StateUf;
  vegetation_area: number;
  culture: CultureFarmDB[];
  created_at: Date;
  updated_at: Date;
};

export type FarmModel = Omit<
  FarmDB,
  | "id"
  | "user_id"
  | "culture"
  | "created_at"
  | "updated_at"
  | "state_uf_id"
  | "city"
  | "state_uf"
> & {
  cultures: CultureModel[];
  zip_code: string;
};
