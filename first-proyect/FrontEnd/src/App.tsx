import type { FC } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { ShoppingCartIcon } from './sharedComponents/components/ShoppingCartIcon';
import { useAuth } from './contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import './styles/components/App.css';

const AuthStatus: FC = () => {
  const { user, logout } = useAuth();
  if (user) return (
    <div className="auth-status">
      <div className="auth-status-user">Hola, {user.email}</div>
      <button className="btn small" onClick={logout}>Salir</button>
      <ShoppingCartIcon />
    </div>
  );
  return (
    <div className="auth-status-guest">
      <Link to="/login" className="topbar-btn small">Login</Link>
      <Link to="/register" className="topbar-btn secondary small">Register</Link>
      <ShoppingCartIcon />
    </div>
  );
};

const App: FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {!isAdminRoute && (
        <header className="app-topbar">
          <div className="topbar-inner">
            <div className="brand">🏟️ TuCancha</div>
            <nav className="topbar-nav">
              <Link to="/">Inicio</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/about">Quienes somos</Link>
              <Link to="/contact">Contacto</Link>
            </nav>
          </div>
          <div className="topbar-actions">
            <AuthStatus />
              </div>
        </header>
      )}
      <AppRoutes /> {/* Define las vistas y la navegación */}
    </div>
  );
};

export default App;
