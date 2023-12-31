import { Router } from "express";
import { adaptRoute } from "@/main/adapters";
import { makeUpdateActiveStatusProducerController } from "@/main/factories";


export default (router: Router): void => {
    router.patch('/producer', adaptRoute(makeUpdateActiveStatusProducerController()))
}