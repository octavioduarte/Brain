import { AddProducer } from "@/domain/usecases/producer";
import {
  AddCultureFarmRepository,
  AddFarmRepository,
  AddUserRepository,
} from "@/data/protocols";
import { CultureModel, ProducerModel } from "@/domain/models";
export class AddProducerUseCase implements AddProducer {
  constructor(
    private readonly addProducerRepository: AddUserRepository,
    private readonly addFarmRepository: AddFarmRepository,
    private readonly addCultureFarmRepository: AddCultureFarmRepository
  ) {}

  async add(params: AddProducer.Param): Promise<AddProducer.Result> {
    const producerID = await this.saveProducerOnDB(params).then(
      async (producerID: number) => {
        await this.saveFarmOnDB(params, producerID);
      }
    );

    return Number(producerID);
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

  private async loadAddress(
    _zipCode: string
  ): Promise<{ city: string; state: string }> {
    return {
      city: "São Paulo",
      state: "SP",
    };
  }
}
