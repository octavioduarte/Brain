import { CultureDB } from "./culture";

export type CultureFarmDB = {
  id: number;
  farm_id: number;
  culture_id: number;
  culture: CultureDB;
  occupation_area: number;
  created_at: Date;
  updated_at: Date;
};

export type CultureModel = Omit<
  CultureFarmDB,
  "farm_id" | "created_at" | "updated_at" | "culture"
>;
