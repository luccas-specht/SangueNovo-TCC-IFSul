import { format } from "date-fns";
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
      cep: cep,
      razaoSocial: razaoSocial,
      cnpj: cnpj,
      phone: phone,
      email: email,
      password: password,
    });
    return { data, status };
  };

  const registerDonator = async (
    name: string,
    cpf: string,
    birthday: Date,
    phone: string,
    email: string,
    password: string
  ): Promise<any> => {
    const { data, status } = await post("donator", {
      name: name,
      cpf: cpf,
      birthday: format(birthday, "MM-dd-yyyy"),
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
