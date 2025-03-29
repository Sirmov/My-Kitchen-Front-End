'use client';

import { ReactNode, createContext, useContext } from 'react';

import useLocalStorage from '@hooks/useLocalStorage';

type AuthContextType = {
    auth: Auth | null;
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
};

export type Auth = {
    _id: string;
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    roles: string[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useLocalStorage<Auth | null>('auth', null);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }

    return context;
}
