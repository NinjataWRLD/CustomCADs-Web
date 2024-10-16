import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { useIsAuthenticated } from '@/hooks/requests/identity';
import { getCookie } from '@/utils/cookie-manager';

interface AuthContextValues {
    username: string | null
    userRole: string | null
    isAuthenticated: boolean | null
    setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>
    is: {
        error: boolean,
        loading: boolean,
    }
}

const defaultValues: AuthContextValues = { username: '', userRole: '', isAuthenticated: false, setIsAuthenticated: () => { }, is: { loading: true, error: false } };
export const AuthContext = createContext(defaultValues);

interface AuthProviderProps {
    children: ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [username, setUsername] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const isAuthenticatedQuery = useIsAuthenticated();
    useEffect(() => {
        if (isAuthenticatedQuery.data !== undefined) {
            if (isAuthenticatedQuery.data) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }
    }, [isAuthenticatedQuery.data]);

    useEffect(() => {
        if (isAuthenticated) {
            setUsername(getCookie('username') ?? '');
            setUserRole(getCookie('role') ?? '');
        } else {
            setUsername('');
            setUserRole('');
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ username, userRole, isAuthenticated, setIsAuthenticated, is: { loading: isAuthenticatedQuery.isLoading, error: isAuthenticatedQuery.isError }, }}>
            {children}
        </AuthContext.Provider>
    );
};