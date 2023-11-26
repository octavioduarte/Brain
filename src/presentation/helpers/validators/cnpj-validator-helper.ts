import { Validator } from "@/data/protocols";
import { MessagesErrorEnum } from "@/utils";
import { isValidCNPJ } from "@/utils/functions/is-valid-cnpj";

export class CnpjValidator implements Validator {
  private messageError = MessagesErrorEnum.INVALID_DOCUMENT;

  validate(document: string): string | undefined {
    const isValid = isValidCNPJ(document);
    if (!isValid) return this.messageError;
  }
}