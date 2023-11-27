import { FarmModel, ProducerModel } from "@/domain/models";

export interface AddProducer {
  add: (params: AddProducer.Param) => Promise<AddProducer.Result>;
}

export namespace AddProducer {
  export type Param = ProducerModel;
  export type Result = {
    name: string;
    document: string;
    document_type: string;
    farm: FarmModel[];
    id: number;
  };
}