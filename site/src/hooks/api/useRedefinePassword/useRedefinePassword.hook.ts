import { useRequest } from '../useRequest/useRequest.hook';

export const useRedefinePassword = () => {
    const { post } = useRequest('/password');

    const forgotPassword = async (email: string): Promise<any> => {
        const { data } = await post('/forgot', { email: email });
        return data;
    };

    const resetPassword = async (password: string, token: string): Promise<any> => {
        const { data } = await post('/reset', {
            password: password,
            token: token
        });
        return data;
    };

    return {
        forgotPassword,
        resetPassword
    };
};