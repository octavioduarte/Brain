import { ServerError } from "@/domain/errors";
import { HttpResponse } from "@/presentation/protocols";

export const ok = <T = unknown>(data: T): HttpResponse => ({
  body: data,
  statusCode: 200
})

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400
})

export const created = <T = unknown>(data: T): HttpResponse => ({
  body: data,
  statusCode: 201,
});

export const serverError = (error: Error): HttpResponse => ({
  body: new ServerError(error.stack),
  statusCode: 500,
});