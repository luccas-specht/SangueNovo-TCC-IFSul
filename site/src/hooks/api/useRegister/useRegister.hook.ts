import { useRequest } from "../useRequest/useRequest.hook";

export const useRegister = () => {
  const { post } = useRequest("");

  const registerInstitution = async (
    razaoSocial: string,
    cep: string,
    cnpj: string,
    phone: string,
    email: string,
    password: string
  ): Promise<any> => {
    const { data, status } = await post("institution", {
      razaoSocial: razaoSocial,
      cep: cep,
      cnpj: cnpj,
      phone: phone,
      email: email,
      password: password,
    });
    return { data, status };
  };

  const registerDonator = async (
    name: string,
    phone: string,
    email: string,
    password: string
  ): Promise<any> => {
    const { data, status } = await post("donator", {
      name: name,
      // birthday: format(birthday, "MM-dd-yyyy"),
      phone: phone,
      email: email,
      password: password,
    });
    return { data, status };
  };

  return {
    registerDonator,
    registerInstitution,
  };
};
