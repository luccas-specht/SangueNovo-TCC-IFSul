const cpfMask = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");

const cnpjMask = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");

const phoneBrMask = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");

const cepMask = (value: string) =>
  value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");

export const masks = () => {
  return {
    cpfMask: (value: string) => cpfMask(value),
    cnpjMask: (value: string) => cnpjMask(value),
    phoneBrMask: (value: string) => phoneBrMask(value),
    cepMask: (value: string) => cepMask(value),
  };
};
