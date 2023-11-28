import { Router } from "express";
import { adaptRoute } from "@/main/adapters";
import { makeLoadMetricsController } from "@/main/factories";


export default (router: Router): void => {
    router.get('/metrics', adaptRoute(makeLoadMetricsController()));
}