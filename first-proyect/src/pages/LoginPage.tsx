import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones básicas
    const trimmed = email.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(trimmed)) return setError('Introduce una dirección de correo válida.');

    const ok = auth.login(trimmed, password);
    if (ok) {
      if (auth.isAdmin()) {
        // Si es admin, redirige a la página de administración (canchas)
        navigate('/admin/canchas');
      } else {
        // Si es usuario normal, redirige a la página principal
        navigate('/');
      }
    } else {
      setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <div className="auth-form-row">
            <label className="auth-label">Email</label>
            <input className="search-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="auth-form-row">
            <label className="auth-label">Password</label>
            <input type="password" className="search-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && (
            <div className="auth-error">
              {error} <Link to="/register" style={{ marginLeft: 8, color: 'var(--topbar)', fontWeight: 700 }}>Registrarse</Link>
            </div>
          )}

          <div className="auth-actions">
            <button className="btn" type="submit">Login</button>
            <Link to="/register" className="btn secondary">Register</Link>
          </div>
        </form>
        <div style={{ marginTop: 12, color: 'var(--muted)' }}>
          <p>Demo user: demo@tucancha.test / demo1234</p>
          <p>Admin user: admin@tucancha.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
