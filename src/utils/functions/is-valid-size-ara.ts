import { FarmModel } from "@/domain/models";

export type CalcResult = {
    hasError: boolean
    farmName?: string | null
    ['Total culture area is greather than farm area.']: boolean
    ['Total culture area is greather than arable area.']: boolean
    ['Total culture area plus vegetation area is greather than farm area.']: boolean
    ['Total vegetation area plus arable area is greather than farm area.']: boolean
}

export const isValidSizeArea = (farmData: FarmModel[]): CalcResult => {
  for (const farm of farmData) {
    const totalCultureArea = farm.cultures.reduce((accumulatedArea, currentArea) =>
        (accumulatedArea += currentArea.occupation_area),
      0
    );

    if (
      totalCultureArea > farm.area ||
      totalCultureArea > farm.arable_area || 
      (totalCultureArea + farm.vegetation_area) > farm.area ||
      (farm.vegetation_area + farm.arable_area) > farm.area
    ) {


      return {
        hasError: true,
        farmName: farm.name,
        ['Total culture area is greather than farm area.']: totalCultureArea > farm.area,
        ['Total culture area is greather than arable area.']: totalCultureArea > farm.arable_area,
        ['Total culture area plus vegetation area is greather than farm area.']: (totalCultureArea + farm.vegetation_area) > farm.area,
        ['Total vegetation area plus arable area is greather than farm area.']: (farm.vegetation_area + farm.arable_area) > farm.area
      };
    }
  }

  return {
    hasError: false,
    ['Total culture area is greather than farm area.']: false,
    ['Total culture area is greather than arable area.']: false,
    ['Total culture area plus vegetation area is greather than farm area.']: false,
    ['Total vegetation area plus arable area is greather than farm area.']: false
  }
};