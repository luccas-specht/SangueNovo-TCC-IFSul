import { useAxiosApiSangueNovo } from '../useAxios/useAxios.hook';

const axios = useAxiosApiSangueNovo();

export const useRegister = () => {
    const registerInstitution = async (
        razaoSocial: string, 
        cnpj: string, 
        email: string, 
        password: string ) => {
        try {
            const response = await axios.post('/institution', {
                razaoSocial,
                cnpj,
                email,
                password
            })
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    const registerDonator = async (
        name: string, 
        cpf: string, 
        birthday: Date, 
        email: string, 
        password: string) => {
        try {
            const response = await axios.post('/donator', {
                 name,
                 cpf,
                 birthday,
                 email,
                 password
            })
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    return { registerDonator, registerInstitution }
};