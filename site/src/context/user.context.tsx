import React, { createContext, useState } from 'react'
interface AuthenticatedUserProps {
    token: string; 
    user: object;
}
interface AuthProviderProps  { 
    children: React.ReactNode
 }
interface AuthContextProps {
    user: object;
    signOut(): void;
    authenticatedUser(prop: AuthenticatedUserProps): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps)=> {
    const [authUser, setAuthUser] = useState<AuthenticatedUserProps>(()=>{
        const token = localStorage.getItem('@SangueNovo:token');
        const user = localStorage.getItem('@SangueNovo:user');
 
        if(token && user){
         return {token, user: JSON.parse(user)}
        }
        return {} as AuthenticatedUserProps
     });

    const authenticatedUser = ({ token, user }: AuthenticatedUserProps): void => {
      localStorage.setItem('@SangueNovo:token', token);
      localStorage.setItem('@SangueNovo:user', JSON.stringify(user));
      setAuthUser({ token, user });
    }

    const signOut = (): void => {
        localStorage.removeItem('@SangueNovo:token');
        localStorage.removeItem('@SangueNovo:user');
        setAuthUser({} as AuthenticatedUserProps);
    }

    return(
        <AuthContext.Provider
         value={{ 
             user: authUser.user,
             signOut,
             authenticatedUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }