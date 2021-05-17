import { AxiosRequestConfig } from "axios";

import { MethodsAvaibles } from "../../../constants";
import { useAuthenticated } from "../..";

import { useAxiosApiSangueNovo } from "../useAxios/useAxios.hook";

type Response = {
  get: (url?: string, data?: any) => Promise<any>;
  delete: (url?: string, data?: any) => Promise<any>;
  put: (url?: string, data?: any) => Promise<any>;
  patch: (url?: string, data?: any) => Promise<any>;
  post: (url?: string, data?: any) => Promise<any>;
};

export const useRequest = (path: string): Response => {
  const { request } = useAxiosApiSangueNovo();
  const { user } = useAuthenticated();

  const buildUrl = (url?: string) => (url ? `${path}/${url}` : path);

  const buildHeaders = () => ({
    Authorization: `Bearer ${user?.token}`,
  });

  const callApi = async (method: MethodsAvaibles, url?: string, data?: any) => {
    const requestConfig: AxiosRequestConfig = {
      data: data,
      method: method,
      url: buildUrl(url),
      headers: buildHeaders(),
    };
    try {
      const res = await request(requestConfig);
      return res;
    } catch (err) {
      return err.response;
    }
  };

  return {
    get: async (url?: string, data?: any) =>
      await callApi(MethodsAvaibles.get, url, data),
    delete: async (url?: string, data?: any) =>
      await callApi(MethodsAvaibles.delete, url, data),
    put: async (url?: string, data?: any) =>
      await callApi(MethodsAvaibles.put, url, data),
    patch: async (url?: string, data?: any) =>
      await callApi(MethodsAvaibles.patch, url, data),
    post: async (url?: string, data?: any) =>
      await callApi(MethodsAvaibles.post, url, data),
  };
};
