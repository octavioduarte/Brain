import { FarmDB, FarmModel } from "./farm";

export type ProducerDB = {
  id: number;
  document: string;
  document_type: string;
  farm: FarmDB[];
};

export type ProducerModel = Omit<ProducerDB, "id" | 'farm'> & {
    farm: FarmModel
};
