import { useAxios } from '../api/use-axios.hook';

const axios = useAxios();

const useRegister = () => {
    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post('/users', {
                name: name,
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

export { useRegister }