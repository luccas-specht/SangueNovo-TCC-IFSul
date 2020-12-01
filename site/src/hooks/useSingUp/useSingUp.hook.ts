import { useAxiosApiSangueNovo } from '../api/useAxios.hook';

const axios = useAxiosApiSangueNovo();

const useSingUp = () => {
    const singUp = async (name: string, email: string, password: string) => {
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
    return { singUp }
}

export { useSingUp };