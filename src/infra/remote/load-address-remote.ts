import axios from "axios";
import { LoadAddress } from "@/data/protocols/remote";
import { ZipCodeError } from "@/domain/errors/zip-code-remote-error";

export class LoadAddressByZipCode implements LoadAddress{
  async loadAddress(zipCode: string): Promise<LoadAddress.Result> {
    try {
      const result = await axios.get<LoadAddress.Result>(`https://viacep.com.br/ws/${zipCode}/json/`);
      return result.data;
    } catch (error) {
        throw new ZipCodeError(zipCode)
    }
  }
}
