import type { FC } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { CartProvider } from './contexts/CartContexts'; // El Contexto del Carrito
import { ShoppingCartIcon } from './sharedComponents/components/ShoppingCartIcon';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Link } from 'react-router-dom';

const AuthStatus: FC = () => {
  const { user, logout } = useAuth();
  if (user) return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ color: 'white' }}>Hola, {user.email}</div>
      <button className="btn small" onClick={logout}>Salir</button>
      <ShoppingCartIcon />
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Link to="/login" className="topbar-btn small">Login</Link>
      <Link to="/register" className="topbar-btn secondary small">Register</Link>
      <ShoppingCartIcon />
    </div>
  );
};

const App: FC = () => {
  return (
    // Envuelve toda la aplicación en el Contexto de Estado Global
    <AuthProvider>
      <CartProvider>
        <div>
          <header className="app-topbar">
            <div className="topbar-inner">
              <div className="brand">🏟️ TuCancha</div>
              <nav className="topbar-nav">
                <Link to="/">Inicio</Link>
                <Link to="/">Canchas</Link>
                <Link to="/about">Quienes somos</Link>
                <Link to="/contact">Contacto</Link>
              </nav>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <AuthStatus />
            </div>
          </header>
          <AppRoutes /> {/* Define las vistas y la navegación */}
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
