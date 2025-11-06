import React from 'react';
import './AdminTopbar.css';

export default function AdminTopbar() {
    return (
        <header className="topbar">
            {/* contenedor centrado */}
            <div className="topbar__inner">
                <div className="topbar__section topbar__left">
                    <button className="topbar__item topbar__menu" aria-label="menu">☰</button>
                    <div className="topbar__brand topbar__item">TuCancha</div>
                </div>

                <div className="topbar__section topbar__center">
                    <div className="topbar__search topbar__item">
                        <input
                            type="search"
                            placeholder="Buscar..."
                            className="topbar__search-input"
                            aria-label="buscar"
                        />
                    </div>
                </div>

                <div className="topbar__section topbar__right">
                    <button className="topbar__item" aria-label="notificaciones">🔔</button>
                    <button className="topbar__item" aria-label="configuración">⚙️</button>
                    <img
                        className="topbar__avatar"
                        src="/assets/avatar-placeholder.png"
                        alt="avatar"
                    />
                </div>
            </div>
        </header>
    );
}