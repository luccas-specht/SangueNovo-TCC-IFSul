import axios, { AxiosInstance } from 'axios';

export const useAxiosApiSangueNovo = (headers?: object): AxiosInstance => (
     axios.create({ 
          baseURL: process.env.REACT_APP_API_URL_SANGUE_NOVO, 
          headers
     })
);

export const useAxiosApiViaCEP = (): AxiosInstance => (
     axios.create({ 
          baseURL: process.env.REACT_APP_API_URL_VIA_CEP
     })
);