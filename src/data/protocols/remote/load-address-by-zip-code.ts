export interface LoadAddress {
  loadAddress: (zipCode: string) => Promise<LoadAddress.Result>;
}

export namespace LoadAddress {
  export type Result = {
    localidade: string;
    uf: string;
  };
}
