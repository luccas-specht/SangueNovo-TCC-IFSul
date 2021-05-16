import { useRequest } from "../useRequest/useRequest.hook";

export const useListInstitution = () => {
  const { get } = useRequest("/institution");

  const listInstitution = async (): Promise<any> => {
    const response = await get("list");
    return response;
  };

  return {
    listInstitution,
  };
};
