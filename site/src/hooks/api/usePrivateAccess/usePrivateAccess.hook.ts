import { useRequest } from "../useRequest/useRequest.hook";

export const usePrivateAccess = () => {
  const { get } = useRequest("/access");
  console.log("get", get());

  const tokenIsAuthentication = async (): Promise<any> => {
    const { status } = await get();
    return { status };
  };

  return {
    tokenIsAuthentication,
  };
};
