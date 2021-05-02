import axios, { AxiosInstance } from "axios";

export const useAxiosApiSangueNovo = (): AxiosInstance =>
  axios.create({
    baseURL: "http://localhost:3333",
  });

export const useAxiosApiGoogle = (): AxiosInstance =>
  axios.create({
    baseURL: "https://www.google.com/maps/place",
  });
