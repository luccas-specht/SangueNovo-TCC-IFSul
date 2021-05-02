import { useAxiosApiGoogle } from "../useAxios/useAxios.hook";

export const useRequestGoogle = () => {
  const { get } = useAxiosApiGoogle();

  const cepToLatitudeLongitude = async (CEP: string | number): Promise<any> => {
    const res = await get(`/${CEP}`);
    return res;
  };

  return {
    cepToLatitudeLongitude,
  };
};
