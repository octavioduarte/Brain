import { Request, RequestHandler, Response } from "express";
import { Controller } from "@/presentation/protocols";

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const { body, query } = req;
    const request = {
      ...query,
      ...body,
    };

    const httpResponse = await controller.handle({ ...request });
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message });
    }
  };
};
