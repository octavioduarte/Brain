import { HttpResponse } from "@/presentation/protocols";

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400
})

export const created = <T = unknown>(data: T): HttpResponse => ({
  body: data,
  statusCode: 201,
});

export const serverError = (error: Error): HttpResponse => ({
  body: new Error(error.stack),
  statusCode: 500,
});