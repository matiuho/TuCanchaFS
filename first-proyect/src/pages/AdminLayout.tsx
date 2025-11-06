import { type FC } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AdminLayout: FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            <header className="admin-header">
                <nav className="admin-nav">
                    <ul className="admin-menu">
                        <li>
                            <Link to="/admin/canchas">Canchas</Link>
                        </li>
                        <li>
                            <Link to="/admin/usuarios">Usuarios</Link>
                        </li>
                        <li>
                            <Link to="/admin/reportes">Reportes</Link>
                        </li>
                        <li className="profile-menu">
                            <Link to="/admin/perfil">Perfil</Link>
                            <button onClick={handleLogout} className="logout-btn">
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};
