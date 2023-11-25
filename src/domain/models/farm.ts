import { Culture } from "./culture";

export type Farm = {
  name: string;
  area: number;
  arable_area: number;
  vegetation_area: number;
  culture: Culture
};