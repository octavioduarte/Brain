import { Validator } from "@/data/protocols";
import { checkMatchBetweenCultureFarmAndCultures, MessagesErrorEnum } from "@/utils";

export class CheckMatchBetweenCultureFarmAndCulturesDBValidator implements Validator {
  validate(lists: { culturesDB: number[]; culturesFarm: number[] }): string | undefined {
    const error = checkMatchBetweenCultureFarmAndCultures(lists.culturesFarm, lists.culturesDB)
    if (!error.allMatch){
      return `${MessagesErrorEnum.INVALID_CULTURE} - ${lists.culturesFarm[Number(error.indexOfWrong)]}`
    }
  }
}