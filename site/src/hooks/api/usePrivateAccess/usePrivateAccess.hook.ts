import { useRequest } from "../useRequest/useRequest.hook";

export const usePrivateAccess = () => {
  const { get } = useRequest("/access");

  const tokenIsAuthentication = async (): Promise<any> => {
    const { status } = await get();
    return { status };
  };

  return {
    tokenIsAuthentication,
  };
};
