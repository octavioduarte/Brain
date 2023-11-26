import cors from "cors";
import { Request, Response, Express, json, NextFunction } from "express";

export const contentType = (
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  res.type("json");
  next();
};
export default (app: Express): void => {
  app.use(json());
  app.use(cors());
  app.use(contentType)
};
