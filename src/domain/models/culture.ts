export type CultureDB = {
  farm_id: number
  description: string;
  occupation_area: number;
};

export type CultureModel = Omit<CultureDB, 'farm_id'>