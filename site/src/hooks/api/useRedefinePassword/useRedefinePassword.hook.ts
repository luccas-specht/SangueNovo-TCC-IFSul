import { useAxiosApiSangueNovo } from '../useAxios/useAxios.hook';

const axios = useAxiosApiSangueNovo();

export const useRedefinePassword = () => {

    const forgotPassword = async (email: string) => {
        try {
            const response = await axios.post('/password/forgot', {
                email: email
            })
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    const resetPassword = async (password: string, token: string) => {
        try {
            const response = await axios.post('/password/reset', {
                password: password,
                token: token
            })
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    return { forgotPassword, resetPassword }
};