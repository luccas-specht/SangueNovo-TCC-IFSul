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
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');
 
        if(token && user){
         return {token, user: JSON.parse(user)}
        }
        return {} as AuthenticatedUserProps
     });

    const authenticatedUser = ({ token, user }: AuthenticatedUserProps): void => {
      localStorage.setItem('@GoBarber:token', token);
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));
      setAuthUser({ token, user });
    }

    const signOut = (): void => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');
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