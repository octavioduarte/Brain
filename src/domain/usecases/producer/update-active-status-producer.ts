export interface UpdateActiveStatusProducer {
    updateActiveStatusProducer: (document: UpdateActiveStatusProducer.DocumentParam, newStatus: UpdateActiveStatusProducer.NewStatus) => Promise<UpdateActiveStatusProducer.Result>;
}

export namespace UpdateActiveStatusProducer {
  export type DocumentParam = string
  export type NewStatus = boolean
  export type Result = {
    active: boolean;
    name: string;
    document: string;
  }
}