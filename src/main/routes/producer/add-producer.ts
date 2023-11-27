import { Router } from "express";
import { adaptRoute } from "@/main/adapters";
import { makeAddProducerController } from "@/main/factories";


export default (router: Router): void => {
    router.post('/producer', adaptRoute(makeAddProducerController()));
}