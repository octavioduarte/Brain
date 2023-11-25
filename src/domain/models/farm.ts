import { CultureDB, CultureModel } from "./culture";

export type FarmDB = {
  user_id: number;
  id: number;
  name: string;
  area: number;
  arable_area: number;
  vegetation_area: number;
  culture: CultureDB;
};

export type FarmModel = Omit<FarmDB, "id" | "user_id" | "culture"> & {
  culture: CultureModel
};