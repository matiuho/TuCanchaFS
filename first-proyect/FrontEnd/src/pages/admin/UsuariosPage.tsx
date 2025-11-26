import { useEffect, useMemo, useState, type FC, type FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';

type LocalUser = { email: string; password: string; role: 'admin' | 'user' };
const KEY_USERS = 'tuCancha_users';

function readUsers(): LocalUser[] {
    try {
        const raw = localStorage.getItem(KEY_USERS);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeUsers(users: LocalUser[]) {
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

export const UsuariosPage: FC = () => {
    const { user: sessionUser, logout } = useAuth();
    const [users, setUsers] = useState<LocalUser[]>(() => readUsers());
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState<{ password: string; role: 'admin' | 'user' }>({ password: '', role: 'user' });
    const [query, setQuery] = useState('');
    const [newUser, setNewUser] = useState<{ email: string; password: string; role: 'admin' | 'user' }>({ email: '', password: '', role: 'user' });

    useEffect(() => { writeUsers(users); }, [users]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return users;
        return users.filter(u => u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));
    }, [users, query]);

    const startEdit = (email: string) => {
        const found = users.find(u => u.email === email);
        if (!found) return;
        setEditing(email);
        setForm({ password: found.password, role: found.role });
    };

    const cancelEdit = () => {
        setEditing(null);
        setForm({ password: '', role: 'user' });
    };

    const submitEdit = (e: FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        const next = users.map(u => u.email === editing ? { ...u, password: form.password, role: form.role } : u);
        setUsers(next);
        if (sessionUser?.email === editing && sessionUser.role !== form.role) {
            // si cambió el rol del usuario actual, forzar re-login para refrescar permisos
            logout();
        }
        cancelEdit();
    };

    const removeUser = (email: string) => {
        if (!confirm(`¿Eliminar usuario ${email}?`)) return;
        const next = users.filter(u => u.email !== email);
        setUsers(next);
        if (sessionUser?.email === email) logout();
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Gestión de Usuarios</h1>
                <input
                    className="form-input"
                    style={{ maxWidth: 280 }}
                    placeholder="Buscar por email o rol"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

                <div className="profile-card" style={{ marginTop: 0 }}>
                    <h2 style={{ marginTop: 0 }}>Crear nuevo usuario</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const email = newUser.email.trim().toLowerCase();
                            if (!email || !newUser.password) return alert('Email y password son requeridos');
                            if (users.some(u => u.email.toLowerCase() === email)) return alert('Ya existe un usuario con ese email');
                            const toAdd: LocalUser = { email, password: newUser.password, role: newUser.role };
                            const next = [...users, toAdd];
                            setUsers(next);
                            setNewUser({ email: '', password: '', role: 'user' });
                        }}
                        className="court-form"
                    >
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-input"
                                value={newUser.email}
                                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="text"
                                className="form-input"
                                value={newUser.password}
                                onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Rol</label>
                            <select
                                className="form-input"
                                value={newUser.role}
                                onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as 'admin' | 'user' }))}
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type="submit" className="btn">Agregar usuario</button>
                    </form>
                </div>

                <div className="profile-card">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left' }}>
                                <th style={{ padding: '8px' }}>Email</th>
                                <th style={{ padding: '8px' }}>Rol</th>
                                <th style={{ padding: '8px' }}>Password</th>
                                <th style={{ padding: '8px' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(u => (
                                <tr key={u.email} style={{ borderTop: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>{u.email}</td>
                                    <td style={{ padding: '8px' }}>
                                        {editing === u.email ? (
                                            <select
                                                value={form.role}
                                                onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value as 'admin' | 'user' }))}
                                                className="form-input"
                                            >
                                                <option value="user">Usuario</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        ) : (
                                            <span className="badge">{u.role}</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                        {editing === u.email ? (
                                            <input
                                                type="text"
                                                value={form.password}
                                                onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                                                className="form-input"
                                            />
                                        ) : (
                                            <span style={{ color: '#999' }}>•••••••</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                        {editing === u.email ? (
                                            <form onSubmit={submitEdit} style={{ display: 'inline-flex', gap: 8 }}>
                                                <button className="btn small" type="submit">Guardar</button>
                                                <button className="btn small secondary" type="button" onClick={cancelEdit}>Cancelar</button>
                                            </form>
                                        ) : (
                                            <div style={{ display: 'flex', gap: 8 }}>
                                                <button className="btn small" onClick={() => startEdit(u.email)}>Editar</button>
                                                <button className="btn small secondary" onClick={() => removeUser(u.email)}>Eliminar</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <p style={{ color: 'var(--muted)', padding: '8px' }}>No hay usuarios para mostrar.</p>
                    )}
                </div>
            </div>
        </div>
    );
};