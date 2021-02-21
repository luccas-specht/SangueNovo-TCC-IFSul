import { useRequest } from '../useRequest/useRequest.hook';

export const useAuth = () => {
    const { post } = useRequest('/auth');

    const authentication = async (email: string, password: string): Promise<any> => {
        const { data, status } = await post('', { email: email, password: password })
        return { data, status }
    }
    return {
        authentication
    };
};