import type { FC } from 'react';

export const AdminHomePage: FC = () => {
    return (
        <div className="admin-dashboard">
            <h1>Panel de Administración</h1>
            <div className="admin-stats">
                <div className="stat-card">
                    <h3>Canchas Activas</h3>
                    <p className="stat-number">6</p>
                </div>
                <div className="stat-card">
                    <h3>Reservas Pendientes</h3>
                    <p className="stat-number">8</p>
                </div>
                <div className="stat-card">
                    <h3>Reservas Totales</h3>
                    <p className="stat-number">24</p>
                </div>
            </div>
            <div className="quick-actions">
                <h2>Acciones Rápidas</h2>
                <div className="action-buttons">
                    <a href="/admin/canchas" className="btn">
                        Gestionar Canchas
                    </a>
                    <a href="/admin/orders" className="btn secondary">
                        Ver Reservas
                    </a>
                </div>
            </div>
        </div>
    );
};
