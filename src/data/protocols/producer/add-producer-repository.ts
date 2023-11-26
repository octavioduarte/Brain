export interface AddUserRepository {
  save: (params: AddUserRepository.Param) => Promise<AddUserRepository.Result>;
}
export namespace AddUserRepository {
  export type Param = {
    document: string
    document_type: string
    name: string
  };
  export type Result = number;
}