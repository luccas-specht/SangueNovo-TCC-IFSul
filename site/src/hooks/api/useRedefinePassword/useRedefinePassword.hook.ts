import { useRequest } from "../useRequest/useRequest.hook";

export const useRedefinePassword = () => {
  const { post } = useRequest("/password");

  const forgotPassword = async (email: string): Promise<any> => {
    const { data, status } = await post("forgot", { email: email });
    return { data, status };
  };

  const resetPassword = async (
    token: string,
    password: string,
    passwordConfirmation: string
  ): Promise<any> => {
    const { data, status } = await post("reset", {
      token_id: token,
      password: password,
      password_confirmation: passwordConfirmation,
    });
    return { data, status };
  };

  return {
    forgotPassword,
    resetPassword,
  };
};
