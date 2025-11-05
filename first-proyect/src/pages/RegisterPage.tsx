import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const RegisterPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    // Validaciones básicas
    const trimmed = email.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(trimmed)) return setError('Introduce una dirección de correo válida.');
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');
    if (!/[A-Z]/.test(password)) return setError('La contraseña debe contener al menos una letra mayúscula.');

    const ok = auth.register(trimmed, password);
    if (ok) navigate('/');
    else setError('El usuario ya existe, intenta iniciar sesión.');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <div className="auth-form-row">
            <label className="auth-label">Email</label>
            <input className="search-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="auth-form-row">
            <label className="auth-label">Password</label>
            <input type="password" className="search-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <div className="auth-actions">
            <button className="btn" type="submit">Register</button>
            <Link to="/login" className="btn secondary">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
