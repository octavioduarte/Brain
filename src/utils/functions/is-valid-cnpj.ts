export const isValidCNPJ = (document: string): boolean => {
  const regexCNPJ = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/;

  if (!document) return false;

  const isString = typeof document === "string";
  const validTypes =
    isString || Number.isInteger(document) || Array.isArray(document);

  if (!validTypes) return false;

  if (isString) {
    const digitsOnly = /^\d{14}$/.test(document);
    const validFormat = regexCNPJ.test(document);
    const isValid = digitsOnly || validFormat;

    if (!isValid) return false;
  }

  const numbers = matchNumbers(document);

  if (numbers.length !== 14) return false;

  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  const digits = numbers.slice(12);

  const digit0 = validCalc(12, numbers);
  if (digit0 !== digits[0]) return false;

  const digit1 = validCalc(13, numbers);
  return digit1 === digits[1];
};

const validCalc = (x: number, numbers: number[]): number => {
  const slice = numbers.slice(0, x);
  let factor = x - 7;
  let sum = 0;

  for (let i = x; i >= 1; i--) {
    const n = slice[x - i];
    sum += n * factor--;
    if (factor < 2) factor = 9;
  }

  const result = 11 - (sum % 11);

  return result > 9 ? 0 : result;
}

function matchNumbers(document: string | number | number[] = "") {
  const match = document.toString().match(/\d/g);
  return Array.isArray(match) ? match.map(Number) : [];
}