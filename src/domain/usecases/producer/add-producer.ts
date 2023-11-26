import { ProducerDB, ProducerModel } from "@/domain/models";

export interface AddProducer {
    add: (param: AddProducer.Param) => Promise<AddProducer.Result>
}

export namespace AddProducer {
    export type Param = ProducerModel
    export type Result = number
}