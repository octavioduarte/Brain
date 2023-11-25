import { ProducerDB, ProducerModel } from "@/domain/models";

export interface AddUserRepository {
  save: (param: AddUserRepository.Param) => Promise<AddUserRepository.Result>;
}

export namespace AddUserRepository {
  export type Param = ProducerModel;
  export type Result = ProducerDB;
}