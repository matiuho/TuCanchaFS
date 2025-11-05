import type { FC } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { ShoppingCartIcon } from './sharedComponents/components/ShoppingCartIcon';
import { useAuth } from './contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const AuthStatus: FC = () => {
  const { user, logout } = useAuth();
  if (user) return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ color: 'white' }}>Hola, {user.email}</div>
      <button className="btn small" onClick={logout}>Salir</button>
      <Link to="/cart"><ShoppingCartIcon /></Link>
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Link to="/login" className="topbar-btn small">Login</Link>
      <Link to="/register" className="topbar-btn secondary small">Register</Link>
      <Link to="/cart"><ShoppingCartIcon /></Link>
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
              <Link to="/">Canchas</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/about">Quienes somos</Link>
              <Link to="/contact">Contacto</Link>
            </nav>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <AuthStatus />
          </div>
        </header>
      )}
      <AppRoutes /> {/* Define las vistas y la navegación */}
    </div>
  );
};

export default App;
