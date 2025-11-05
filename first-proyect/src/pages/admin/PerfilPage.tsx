import type { FC } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const PerfilPage: FC = () => {
    const { user } = useAuth();

    return (
        <div className="admin-page">
            <h1>Perfil de Administrador</h1>
            <div className="admin-content">
                <div className="profile-card">
                    <h2>Información del Usuario</h2>
                    <div className="profile-info">
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Rol:</strong> {user?.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};