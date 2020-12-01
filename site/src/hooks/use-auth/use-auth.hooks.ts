import { useAxios } from '../api/use-axios.hook';

const axios = useAxios();

const useAuth = () => {
    const authentication = async (email: string, password: string) => {
        try {
            const response = await axios.post('/auth', {
                email: email,
                password: password
            })
            return response.data;
        } catch (error) {
            return error.response;
        }
    }
    return { authentication }
}

export { useAuth }