import { useAxiosApiSangueNovo } from '../api/useAxios.hook';

const axios = useAxiosApiSangueNovo();

const useRegister = () => {
    const register = async (nameRazaoSocial: string, cpfCnpf: string, email: string, password: string ) => {
        try {
            const response = await axios.post('/users', {
                nameRazaoSocial: nameRazaoSocial,
                cpfCnpf: cpfCnpf,
                email: email,
                password: password
            })
            return response.data;
        } catch (error) {
            return error.response;
        }
    }
    return { register }
}

export { useRegister };