import { useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import { methodsAvaibles } from '../../../constants'
import { useAxiosApiSangueNovo } from '../useAxios/useAxios.hook';

export const useRequest = (path: string) => {
  const [errors, setErrors] = useState('');
    const { request } = useAxiosApiSangueNovo();

    const buildUrl = (url?: string) =>
        url ? `${path}/${url}` : path

    const buildHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem('@access_token')}`
    })

    const handleErrors = (e: any) => {
      if (e.response) {
        if (e.response.status === 400){
          setErrors(e.response)
        } else if (e.response.status === 401) {
          setErrors(e.response)
        }
        return errors
      } else {
        throw new Error('generico');
      }
    };

    const callApi = async (method: string, url?: string, data?: any) => {
        const requestConfig = {
            data: data,
            method: method,
            url: buildUrl(url),
            headers: buildHeaders()
        } as AxiosRequestConfig;

        try {
            return await request(requestConfig);
        } catch (err) {
          handleErrors(err)
        }
    }
    return {
        errors,
        setErrors,

        get: async (url?: string, data?: any): Promise<any> =>
            callApi(methodsAvaibles.get(), url, data),
        delete: async (url?: string, data?: any): Promise<any> =>
            callApi(methodsAvaibles.delete(), url, data),
        put: async (url?: string, data?: any): Promise<any> =>
            callApi(methodsAvaibles.put(), url, data),
        patch: async (url?: string, data?: any): Promise<any> =>
            callApi(methodsAvaibles.patch(), url, data),
        post: async (url?: string, data?: any): Promise<any> =>
            callApi(methodsAvaibles.post(), url, data),
    }
}