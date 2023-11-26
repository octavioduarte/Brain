import { Validator } from "@/data/protocols";
import { isValidCPF, MessagesErrorEnum } from "@/utils";

export class CpfValidator implements Validator {
  private messageError = MessagesErrorEnum.INVALID_CPF;

  validate(document: string): string | undefined {
    const isValid = isValidCPF(document);
    if (!isValid) return this.messageError;
  }
}