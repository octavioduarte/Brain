export type CultureDB = {
  farm_id: number;
  description: string;
  occupation_area: number;
  created_at: Date;
  updated_at: Date;
};

export type CultureModel = Omit<
  CultureDB,
  "farm_id" | "created_at" | "updated_at"
>;
