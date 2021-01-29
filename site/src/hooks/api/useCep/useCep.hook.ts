import { useAxiosApiViaCEP } from '../useAxios/useAxios.hook';

const axios = useAxiosApiViaCEP();

export const useCEP = () => {
    const findAdressByCEP = async (CEP: string) => {
        try {
            const response = await axios.get(`${CEP}/json/`)
            return response.data;
        } catch (error) {
            return error.response;
        }
    }
    return { findAdressByCEP }
};