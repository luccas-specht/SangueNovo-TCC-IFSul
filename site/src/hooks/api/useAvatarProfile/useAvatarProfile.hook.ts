import { useRequest } from "../useRequest/useRequest.hook";

export const useAvatarProfile = () => {
  const { patch } = useRequest("/profile");

  const forgotPassword = async (avatar: any): Promise<any> => {
    const { data, status } = await patch("avatar");
    return { data, status };
  };

  return {
    forgotPassword,
  };
};
