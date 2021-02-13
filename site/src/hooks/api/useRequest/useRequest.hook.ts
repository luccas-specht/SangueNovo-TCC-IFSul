import { useAxiosApiSangueNovo } from '../useAxios/useAxios.hook';
import { MethodAvaible } from '../../../constants';

export const useRequest = (path: string) => {
    const { request } = useAxiosApiSangueNovo();

    const buildUrl = (url?: string) => (
        url ? `${path}/${url}` : path
    );

    const buildHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
    });

    const callApi = async ({ url = '', data = null, ...config }) => {
        const requestConfig = config;
        
        requestConfig.url = buildUrl(url);
        requestConfig.headers = buildHeaders();
        requestConfig.data = data;
        
        try {
          return await request(requestConfig);
        } catch (err) {
            return err.response
        }
    }

    return {
      get: async (url: string, config = {}): Promise<any>  =>
          callApi({ method: MethodAvaible.get(), url, ...config }),

      delete: async (url: string, config = {}): Promise<any>  =>
          callApi({ method: MethodAvaible.delete(), url, ...config }),

      put: async (url: string, data: any, config = {}): Promise<any> => 
          callApi({ method: MethodAvaible.put(), url, data, ...config }),

      patch: async (url: string, data: any, config = {}): Promise<any>  =>
          callApi({ method: MethodAvaible.patch(), url, data, ...config }),

      post: async (url: string, data: any, config = {}): Promise<any>  =>
          callApi({ method: MethodAvaible.post(), url, data, ...config }),      
    }
};