import { FarmDB, FarmModel } from "./farm";

export type ProducerDB = {
  id: number;
  active: boolean;
  name: string;
  document: string;
  document_type: string;
  farm: FarmDB[];
  created_at: Date;
  updated_at: Date;
};

export type ProducerModel = Omit<
  ProducerDB,
  "id" | "farm" | "active" | "created_at" | "updated_at"
> & {
  farm: FarmModel[];
};
