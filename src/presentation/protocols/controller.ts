import { HttpResponse } from "./http";

export interface Controller<T = unknown> {
  handle: (request: T) => Promise<HttpResponse>;
}