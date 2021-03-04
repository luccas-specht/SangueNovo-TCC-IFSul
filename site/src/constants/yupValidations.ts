import * as Yup from "yup";

const isCnpjValid = function (this: Yup.StringSchema, msg?: any) {
  return this.test(`isCnpjValid`, msg, function (value) {
    let tamanho;
    let numeros: any;
    let soma = 0;
    let pos;
    let resultado;

    const { path, createError } = this;
    const message = msg ?? "CNPJ é inválido.";

    value = value?.replace(/[^\d]+/g, "");

    if (!value) return true;

    if (value.length !== 14) return createError({ path, message });

    if (
      value === "00000000000000" ||
      value === "11111111111111" ||
      value === "22222222222222" ||
      value === "33333333333333" ||
      value === "44444444444444" ||
      value === "55555555555555" ||
      value === "66666666666666" ||
      value === "77777777777777" ||
      value === "88888888888888" ||
      value === "99999999999999"
    )
      return createError({ path, message });

    tamanho = value.length - 2;
    numeros = value.substring(0, tamanho) as any;
    const digitos = value.substring(tamanho);
    soma = 0 as any;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado !== Number(digitos.charAt(0)))
      return createError({ path, message });

    tamanho += 1;
    numeros = value.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado !== Number(digitos.charAt(1)))
      return createError({ path, message });

    return true;
  });
};

export const yupValidation = {
  isCnpjValid,
};
