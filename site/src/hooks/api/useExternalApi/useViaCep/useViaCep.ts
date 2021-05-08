import { useAxiosApiViaCep } from "../../useAxios/useAxios.hook";

export const useViaCep = () => {
  const axios = useAxiosApiViaCep();

  const getAddress = async (cep: string) => {
    try {
      const { data } = await axios.get(`/${cep}/json/`);
      return { data };
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return {
    getAddress,
  };
};
