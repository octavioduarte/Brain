export interface LoadProducerByDocumentRepository {
    loadByDocument: (document: LoadProducerByDocumentRepository.Param) => Promise<LoadProducerByDocumentRepository.Result>;
  }
  
  export namespace LoadProducerByDocumentRepository {
    export type Param = string
    export type Result = {
        id: number;
        active: boolean;
        name: string;
        document: string;
        document_type: string;
        created_at: Date;
        updated_at: Date;
    } | null;
  }