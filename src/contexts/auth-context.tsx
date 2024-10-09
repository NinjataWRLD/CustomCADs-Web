import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { useIsAuthenticated } from '@/hooks/requests/identity';
import ErrorPage from '@/components/error-page';
import { getCookie } from '@/utils/cookie-manager';
import getStatusCode from '@/utils/get-status-code';

interface AuthContextValues {
    username: string | null
    userRole: string | null
    isAuthenticated: boolean | null
    isLoading: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>
}

const defaultValues: AuthContextValues = { username: '', userRole: '', isAuthenticated: false, isLoading: true, setIsAuthenticated: () => { } };
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

    if (isAuthenticatedQuery.isError) {
        const status = getStatusCode(isAuthenticatedQuery.error);
        return <ErrorPage status={status} />
    }

    return (
        <AuthContext.Provider value={{ username, userRole, isAuthenticated, setIsAuthenticated, isLoading: isAuthenticatedQuery.isLoading, }}>
            {children}
        </AuthContext.Provider>
    );
};