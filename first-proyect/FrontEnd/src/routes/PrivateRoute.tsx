import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    requireAdmin?: boolean;
}

export const PrivateRoute: FC<Props> = ({ children, requireAdmin = false }) => {
    const { user, isAdmin } = useAuth();

    if (!user) {
        // No está autenticado, redirigir al login
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !isAdmin()) {
        // No es admin, redirigir a la página principal
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};