import { CultureDB, CultureModel } from "./culture";

export type FarmDB = {
  user_id: number;
  id: number;
  name: string;
  area: number;
  arable_area: number;
  vegetation_area: number;
  culture: CultureDB[];
  created_at: Date;
  updated_at: Date;
};

export type FarmModel = Omit<
  FarmDB,
  "id" | "user_id" | "culture" | "created_at" | "updated_at"
> & {
  culture: CultureModel[];
};
