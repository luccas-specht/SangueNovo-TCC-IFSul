import axios, { AxiosInstance } from 'axios';

export const useAxiosApiSangueNovo = (headers?: object): AxiosInstance => (
     axios.create({ baseURL: 'http://localhost:3333/', headers })
);

export const useAxiosApiViaCEP = (): AxiosInstance => (
     axios.create({ baseURL: 'https://viacep.com.br/ws/' })
);