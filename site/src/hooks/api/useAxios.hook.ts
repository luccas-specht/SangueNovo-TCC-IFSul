import axios, { AxiosInstance } from 'axios';

const useAxiosApiSangueNovo = (headers?: object): AxiosInstance => (
     axios.create({ baseURL: 'http://localhost:3333/', headers })
);

const useAxiosApiViaCEP = (): AxiosInstance => (
     axios.create({ baseURL: 'https://viacep.com.br/ws' })
);

export { useAxiosApiSangueNovo, useAxiosApiViaCEP }