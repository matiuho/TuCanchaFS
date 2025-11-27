import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../sharedComponents/components/ToastProvider';

export const RegisterPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    // Validaciones básicas
    const trimmed = email.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(trimmed)) return setError('Introduce una dirección de correo válida.');
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');
    if (!/[A-Z]/.test(password)) return setError('La contraseña debe contener al menos una letra mayúscula.');

    const result = await auth.register(trimmed, password);
    if (result.success) {
      showToast({
        type: 'success',
        title: 'Cuenta creada',
        message: 'Tu cuenta fue creada con éxito. Por favor inicia sesión para continuar.'
      });
      // Redirigir al login para que el usuario inicie sesión manualmente
      navigate('/login');
    } else {
      setError(result.message || 'Error al crear la cuenta. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
  <h2>Crear cuenta</h2>
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
            <button className="btn" type="submit">Crear cuenta</button>
            <Link to="/login" className="btn secondary">Ir a Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
