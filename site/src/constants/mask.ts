type Response = {
  cnpjMask: (value: string) => string;
  phoneBrMask: (value: string) => string;
  cepMask: (value: string) => string;
  dateMask: (value: string) => string;
};

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

const dateMask = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");

export const masks = (): Response => ({
  cnpjMask: (value: string) => cnpjMask(value),
  phoneBrMask: (value: string) => phoneBrMask(value),
  cepMask: (value: string) => cepMask(value),
  dateMask: (value: string) => dateMask(value),
});
