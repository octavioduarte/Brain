import { AddProducer } from "@/domain/usecases/producer";
import {
  AddCultureFarmRepository,
  AddFarmRepository,
  AddUserRepository,
  LoadProducerByDocumentRepository,
} from "@/data/protocols";
import { CultureModel, ProducerModel } from "@/domain/models";
import { DuplicateDocumentError } from "@/domain/errors";
import { LoadAddressByZipCode } from "@/infra/remote";
export class AddProducerUseCase implements AddProducer {
  constructor(
    private readonly addProducerRepository: AddUserRepository,
    private readonly loadProducerByDocumentRepository: LoadProducerByDocumentRepository,
    private readonly addFarmRepository: AddFarmRepository,
    private readonly addCultureFarmRepository: AddCultureFarmRepository,
    private readonly loadAddressByZipCode: LoadAddressByZipCode
  ) {}

  async add(params: AddProducer.Param): Promise<AddProducer.Result> {
    const producerDB = await this.loadProducerByDocumentRepository.loadByDocument(params.document)

    if (producerDB) {
      throw new DuplicateDocumentError(params.document)
    }

    const producerID = await this.saveProducerOnDB(params) 
    await this.saveFarmOnDB(params, producerID);

    return { id: producerID, ...params}
  }

  private async saveProducerOnDB(params: ProducerModel): Promise<number> {
    const { name, document, document_type } = params;
    return await this.addProducerRepository.save({
      name,
      document,
      document_type,
    });
  }

  private async saveFarmOnDB(
    params: ProducerModel,
    producerID: number
  ): Promise<void> {
    const farmList = params.farm;

    for (const farm of farmList) {
      const { zip_code, cultures, ...rest } = farm;
      const { state, city } = await this.loadAddress(farm.zip_code);
      await this.addFarmRepository
        .save({ ...rest, city, state_uf: state, producer_id: producerID })
        .then(async (farmID) => {
          await this.saveCulturesFarmOnDB(cultures, farmID);
        });
    }
  }

  private async saveCulturesFarmOnDB(
    cultures: CultureModel[],
    farmID: number
  ): Promise<void> {
    for (const culture of cultures) {
      await this.addCultureFarmRepository.save({
        area: culture.occupation_area,
        farm_id: farmID,
        culture_id: culture.id,
      });
    }
  }

  private async loadAddress(zipCode: string): Promise<{ city: string; state: string }> {
    const { localidade, uf } = await this.loadAddressByZipCode.loadAddress(zipCode)
    return { city: localidade, state: uf }
  }
}
