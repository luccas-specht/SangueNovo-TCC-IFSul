import React, { createContext, useState } from "react";

type AuthUser = {
  user: object;
  token: string;
};

type AuthProviderData = {
  children: React.ReactNode;
};

type AuthContextData = {
  user: AuthUser;
  signOut(): void;
  authenticatedUser(prop: AuthUser): void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: AuthProviderData) => {
  const [authUser, setAuthUser] = useState<AuthUser>(() => {
    const token = localStorage.getItem("@access_tokenSangueNovo");
    const user = localStorage.getItem("@access_tokenUser");
    if (token && user)
      return {
        token,
        user: JSON.parse(user),
      };
    return {} as AuthUser;
  });

  const authenticatedUser = ({ token, user }: AuthUser): void => {
    localStorage.setItem("@access_tokenSangueNovo", token);
    localStorage.setItem("@access_tokenUser", JSON.stringify(user));
    setAuthUser({ token, user });
  };

  const signOut = (): void => {
    localStorage.removeItem("@access_tokenSangueNovo");
    localStorage.removeItem("@access_tokenUser");
    localStorage.removeItem("@access_lastTimeAuthenticated");
    setAuthUser({} as AuthUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user: authUser,
        signOut,
        authenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
