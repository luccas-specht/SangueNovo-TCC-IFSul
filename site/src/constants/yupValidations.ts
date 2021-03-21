import * as Yup from "yup";

const cnpjValid = function (this: Yup.StringSchema, msg?: any) {
  return this.test(`cnpjValid`, msg, function (value) {
    let length;
    let numbers: any;
    let sum = 0 as any;
    let pos;
    let result;

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

    length = value.length - 2;
    numbers = value.substring(0, length) as any;
    const digits = value.substring(length);
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== Number(digits.charAt(0)))
      return createError({ path, message });

    length += 1;
    numbers = value.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== Number(digits.charAt(1)))
      return createError({ path, message });

    return true;
  });
};

const cepValidation = function (this: Yup.StringSchema, msg?: any) {
  return this.test(`cnpjValid`, msg, async function (value) {
    const { path, createError } = this;

    const message = msg ?? "CEP é inválido.";
    const cepMatches = /^\d{5}\-?\d{3}$/;

    value = value?.replace(/[^\d]+/g, "");

    if (!value) return true;

    if (value.length !== 8) return createError({ path, message });

    if (
      value === "00000000" ||
      value === "11111111" ||
      value === "22222222" ||
      value === "33333333" ||
      value === "44444444" ||
      value === "55555555" ||
      value === "66666666" ||
      value === "77777777" ||
      value === "88888888" ||
      value === "99999999"
    )
      return createError({ path, message });

    const schemaValidationCep = Yup.object().shape({
      cep: Yup.string().matches(cepMatches, message),
    });

    try {
      await schemaValidationCep.validate({ value }, { abortEarly: false });
      return true;
    } catch (err) {
      return createError({ path, message });
    }
  });
};

export const yupValidation = {
  cnpjValid,
  cepValidation,
};
