export interface UpdateActiveStatusProducerRepository {
    updateActiveStatusProducer: (document: UpdateActiveStatusProducerRepository.ParamDocument, newStatus: UpdateActiveStatusProducerRepository.ParamNewStatus ) => Promise<UpdateActiveStatusProducerRepository.Result>;
  }
  
  export namespace UpdateActiveStatusProducerRepository {
    export type ParamDocument = string
    export type ParamNewStatus = boolean
    export type Result = {
        id: number;
        active: boolean;
        name: string;
        document: string;
        document_type: string;
        created_at: Date;
        updated_at: Date;
    }
  }