export const isValidCPF = (document: string): boolean => {
  const valueFormatted = document.replace(/[^\d]+/g, "");
  const ROOT_INVALID_VALUES: string[] = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];

  if (
    valueFormatted === "" ||
    valueFormatted.length !== 11 ||
    ROOT_INVALID_VALUES.includes(document)
  )
    return false

  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(document.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(document.charAt(9))) return false

  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(document.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(document.charAt(10))) return false
  return true
};