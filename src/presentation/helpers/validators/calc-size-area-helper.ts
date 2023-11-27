
import { isValidSizeArea } from "@/utils";
import { FarmModel } from "@/domain/models";
import { Validator } from "@/data/protocols";

export class CalcSizeAreaValidator implements Validator {
  validate(farmData: FarmModel[]): string | undefined {
    const validationResult = isValidSizeArea(farmData);
    if (validationResult.hasError) {
      const { hasError, farmName, ...rest } = validationResult;
      const keysError = Object.keys(rest);
      for (const errorKey of keysError) {
        if (validationResult[errorKey]) {
          return `${errorKey} -  ${farmName}`;
        }
      }
    }
  }
}
