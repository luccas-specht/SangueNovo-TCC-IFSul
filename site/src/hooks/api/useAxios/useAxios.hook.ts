import axios, { AxiosInstance } from 'axios';

export const useAxiosApiSangueNovo = (): AxiosInstance => (
     axios.create({ 
          baseURL: 'http://localhost:3333'
     })
);