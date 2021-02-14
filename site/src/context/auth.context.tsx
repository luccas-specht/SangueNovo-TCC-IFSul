import React, { 
   createContext, 
   useState
} from 'react';

import { AuthUser } from '../model/login/auth.model';

type AuthProvider = { 
    children: React.ReactNode
}

type AuthContext = {
    user: Omit<AuthUser, 'token'>;
    signOut(): void;
    authenticatedUser(prop: AuthUser): void;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: AuthProvider) => {
    const [authUser, setAuthUser] = useState<AuthUser>(() => {
        const token = localStorage.getItem('@SangueNovo:token');
        const user = localStorage.getItem('@SangueNovo:user');
 
        if(token && user) return { 
            token, user: JSON.parse(user)
        };
        
        return {} as AuthUser;
     });

    const authenticatedUser = ({ token, user }: AuthUser): void => {
      localStorage.setItem('@SangueNovo:token', token);
      localStorage.setItem('@SangueNovo:user', JSON.stringify(user));
      setAuthUser({ token, user });
    }

    const signOut = (): void => {
        localStorage.removeItem('@SangueNovo:token');
        localStorage.removeItem('@SangueNovo:user');
        setAuthUser({} as AuthUser);
    }

    return(
        <AuthContext.Provider
         value={{ 
             user: authUser,
             signOut,
             authenticatedUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}