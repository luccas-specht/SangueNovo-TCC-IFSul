import { useAxiosApiSangueNovo } from '../useAxios/useAxios.hook';

const axios = useAxiosApiSangueNovo();

const useRedefinePassword = () => {
    const resetPassword = async (email: string) => {
        try {
            const response = await axios.post('/auth', {
                email: email,
            })
            return response.data;
        } catch (error) {
            return error.response;
        }
    }
    return { resetPassword }
}

export { useRedefinePassword };