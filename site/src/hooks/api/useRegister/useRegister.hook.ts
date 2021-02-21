import { useRequest } from '../useRequest/useRequest.hook';

export const useRegister = () => {
    const { post, errors } = useRequest('');

    const registerInstitution = async (
        razaoSocial: string,
        cnpj: string,
        phone: string,
        email: string,
        password: string
    ): Promise<any> => {
        const { data } = await post('/institution', {
            razaoSocial: razaoSocial,
            cnpj: cnpj,
            phone: phone,
            email: email,
            password: password
        })
        return data;
    };

    const registerDonator = async (
        name: string,
        cpf: string,
        birthday: Date,
        phone: string,
        email: string,
        password: string
    ): Promise<any> => {
        const response = await post('/donator', {
            name: name,
            cpf: cpf,
            birthday: birthday,
            phone: phone,
            email: email,
            password: password
        })
        console.log('data do hook:', response)
        return !!response ? response : errors;
    };

    return {
        registerDonator,
        registerInstitution
    };
};