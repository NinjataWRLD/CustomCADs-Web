import AuthContext from '@/components/auth-context'
import { Outlet, Navigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'

function AuthGuard({ auth, roles }) {
    const { isAuthenticated, userRole } = useContext(AuthContext);
    const [response, setResponse] = useState(<Outlet />);
    
    useEffect(() => {
        if (auth === 'guest' && isAuthenticated) {
            setResponse(<Navigate to="/home" replace />);
        } else if (auth === 'private') {
            if (!isAuthenticated) {
                setResponse(<Navigate to="/login" replace />);
            } else if (roles && userRole && !roles.includes(userRole)) {
                setResponse(<Navigate to="/home" replace />);
            }
        } else {
            setResponse(<Outlet />);
        }
    }, [auth, roles, isAuthenticated, userRole]);

    return response;
}

export default AuthGuard;