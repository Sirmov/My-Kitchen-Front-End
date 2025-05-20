'use client';

import { ReactNode, createContext, useContext } from 'react';

import { User } from '@services/authService';

import useLocalStorage from '@hooks/useLocalStorage';

type AuthContextType = {
    auth: User | null;
    setAuth: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useLocalStorage<User | null>('auth', null);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }

    return context;
}
