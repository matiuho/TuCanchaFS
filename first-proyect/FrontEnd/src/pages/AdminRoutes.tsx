import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import type { FC } from 'react';
import { PrivateRoute } from '../routes/PrivateRoute';
import { UsuariosPage } from './admin/UsuariosPage';
import { ReportesPage } from './admin/ReportesPage';
import { PerfilPage } from './admin/PerfilPage';
import { AdminCourtsPage } from './AdminCourtsPage';
import { useAuth } from '../contexts/AuthContext';

// Componente para manejar la redirección según el tipo de usuario
const AdminRedirect: FC = () => {
    const { isAdmin } = useAuth();
    
    if (isAdmin()) {
        return <Navigate to="/admin/canchas" replace />;
    }
    return <Navigate to="/" replace />;
};

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute requireAdmin>
                        <AdminLayout />
                    </PrivateRoute>
                }
            >
                <Route index element={<AdminRedirect />} />
                <Route path="canchas" element={<AdminCourtsPage />} />
                <Route path="usuarios" element={<UsuariosPage />} />
                <Route path="reportes" element={<ReportesPage />} />
                <Route path="perfil" element={<PerfilPage />} />
                <Route path="*" element={<Navigate to="/admin/canchas" replace />} />
            </Route>
        </Routes>
    );
};
