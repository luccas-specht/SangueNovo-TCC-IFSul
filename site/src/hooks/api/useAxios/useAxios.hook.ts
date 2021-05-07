import axios, { AxiosInstance } from "axios";

export const useAxiosApiSangueNovo = (): AxiosInstance =>
  axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL_SANGUE_NOVO_API}`,
  });

export const useAxiosApiViaCep = (): AxiosInstance =>
  axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL_VIA_CEP_API}`,
  });
