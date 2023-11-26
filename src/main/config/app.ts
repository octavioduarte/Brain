import express from "express";
import setupRoutes from "@/main/config/routes";
import setupMiddlewares from "@/main/config/middlewares";


const app = express();
setupMiddlewares(app);
setupRoutes(app)
export default app
