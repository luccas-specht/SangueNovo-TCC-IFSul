import { useRequest } from "../useRequest/useRequest.hook";

export const useUserProfile = () => {
  const { patch } = useRequest("/profile");
  const { get } = useRequest("/files");

  const updateAvatar = async (): Promise<any> => {
    const { data, status } = await patch("avatar", {});
    return { data, status };
  };

  const getUserAvatar = async (avatarUrl: string): Promise<any> => {
    const response = await get(`${avatarUrl}`);

    return response;
  };

  return {
    updateAvatar,
    getUserAvatar,
  };
};
