import { DocumentType } from "@/utils";
import { CultureFarmDB, FarmModel, ProducerModel } from "@/domain/models";
import { ValidatorSchema } from "@/domain/usecases";
import { LoadAllCulturesRepository, Validator } from "@/data/protocols";

export class AddProducerValidateUseCase implements ValidatorSchema {
  constructor(
    private readonly addProducerValidator: Validator,
    private readonly cpfValidator: Validator,
    private readonly cnpjValidator: Validator,
    private readonly calcSizeAreaValidator: Validator,
    private readonly checkMatchBetweenCultureFarmAndCulturesDBValidator: Validator,
    private readonly culturesRepository: LoadAllCulturesRepository,
  ) {}

  async isValid(fields: ProducerModel): Promise<string | undefined> {
   for (const { validatorHandle, fieldValidate} of this.pipeValidators(fields)) {
      const error = validatorHandle.validate(fieldValidate)
      if (error) return error
   }

   return await this.checkIfCulturesRequestIsValid(fields)
  }


  checkIfCulturesRequestIsValid = async (fields: ProducerModel): Promise<string| undefined> => {
    const culturesDB = await this.culturesRepository.loadAll()
    const culturesFarmIDList: number[] = []

    fields.farm.forEach((farm: FarmModel) => {
      farm.cultures.forEach((farmCulture: Pick<CultureFarmDB, "id" | "culture_id" | "occupation_area">) => {
        culturesFarmIDList.push(farmCulture.id)
      })
    })

    const hasInvalidCulture = this.checkMatchBetweenCultureFarmAndCulturesDBValidator.validate({ culturesDB:culturesDB.map(culture => culture.id), culturesFarm: culturesFarmIDList })
    if (hasInvalidCulture) return hasInvalidCulture
  }

  pipeValidators(fields: ProducerModel): {validatorHandle: Validator, fieldValidate: unknown}[] {
    return   [
      { 
        validatorHandle: fields.document_type === DocumentType.CPF ?  this.cpfValidator : this.cnpjValidator,
        fieldValidate: fields.document },
      { validatorHandle: this.addProducerValidator, fieldValidate: fields }, 
      { validatorHandle: this.calcSizeAreaValidator, fieldValidate: fields.farm}
    ];
  }
}