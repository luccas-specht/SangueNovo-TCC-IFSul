import * as Yup from 'yup';

const cpfValid = function (msg?: any) {
  return Yup.mixed().test(`cpfValid`, msg, function (value) {
    const { path, createError } = this;
    const message = msg ?? 'CPF é inválido.';

    value = value?.replace(/[^\d]/g, '');

    if (!value) return true;

    if (
      value == '00000000000' ||
      value == '11111111111' ||
      value == '22222222222' ||
      value == '33333333333' ||
      value == '44444444444' ||
      value == '55555555555' ||
      value == '66666666666' ||
      value == '77777777777' ||
      value == '88888888888' ||
      value == '99999999999'
    ) return createError({ path, message });

    let sum;
    let rest;
    sum = 0;
    if (value == '00000000000') return createError({ path, message });

    for (var i = 1; i <= 9; i++)
      sum += parseInt(value.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(value.substring(9, 10))) return createError({ path, message });

    sum = 0;
    for (var i = 1; i <= 10; i++)
      sum += parseInt(value.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(value.substring(10, 11))) return createError({ path, message });
    return true;
  });
};

const cnpjValid = function (this: Yup.StringSchema, msg?: any) {
  return this.test(`cnpjValid`, msg, function (value) {
    const { path, createError } = this;
    const message = msg ?? 'CNPJ é inválido.';

    value = value?.replace(/[^\d]+/g, '');

    if (!value) return true;

    if (value.length != 14) return createError({ path, message });

    if (
      value == '00000000000000' ||
      value == '11111111111111' ||
      value == '22222222222222' ||
      value == '33333333333333' ||
      value == '44444444444444' ||
      value == '55555555555555' ||
      value == '66666666666666' ||
      value == '77777777777777' ||
      value == '88888888888888' ||
      value == '99999999999999'
    ) return createError({ path, message });

    let size = value.length - 2;
    let numbers = value.substring(0, size) as any;
    const digitos = value.substring(size);
    let sum = 0 as any;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != Number(digitos.charAt(0))) return createError({ path, message });

    size += 1;
    numbers = value.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != Number(digitos.charAt(1))) return createError({ path, message });

    return true;
  });
};

export const yupValidation = {
    cpfValid,
    cnpjValid,
};