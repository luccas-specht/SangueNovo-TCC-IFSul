import axios, { AxiosInstance } from 'axios';

const useAxios = (baseURL?: string, headers?: object): AxiosInstance => (
     axios.create({ baseURL, headers })
);

export { useAxios }