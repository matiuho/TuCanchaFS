import { useEffect, useMemo, useState, type FC, type FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getAllUsers, updateUser, deleteUser as deleteUserApi, type User } from '../../services/usersService';

export const PerfilPage: FC = () => {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState<{ password: string; role: 'ADMIN' | 'USER' }>({ password: '', role: 'USER' });

    // Cargar usuarios desde el backend
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllUsers();
            setUsers(data);
        } catch (err: any) {
            setError(err.message || 'Error al cargar usuarios');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (email: string) => {
        const u = users.find(x => x.email === email);
        if (!u) return;
        setEditing(email);
        setForm({ password: '', role: u.role });
    };

    const cancelEdit = () => {
        setEditing(null);
        setForm({ password: '', role: 'USER' });
    };

    const submitEdit = async (e: FormEvent) => {
        e.preventDefault();
        if (!editing) return;

        try {
            setError(null);
            // Solo enviar los campos que se van a actualizar
            const updateData: Partial<{ password: string; role: 'ADMIN' | 'USER' }> = { role: form.role };
            
            // Solo incluir password si se ingresó uno nuevo
            if (form.password.trim()) {
                updateData.password = form.password;
            }
            
            await updateUser(editing, updateData);
            // Recargar usuarios
            await loadUsers();
            cancelEdit();
            
            if (user?.email === editing && user.role !== form.role) {
                // Si cambió el rol del usuario actual, avisar y hacer logout
                alert('Has modificado tu propio rol. Debes iniciar sesión nuevamente.');
                await logout();
            } else {
                alert('Usuario actualizado exitosamente');
            }
        } catch (err: any) {
            setError(err.message || 'Error al actualizar usuario');
            alert(err.message || 'Error al actualizar usuario');
        }
    };

    const removeUser = async (email: string) => {
        if (!confirm(`¿Eliminar usuario ${email}?`)) return;

        try {
            setError(null);
            await deleteUserApi(email);
            setUsers(prev => prev.filter(u => u.email !== email));
            if (user?.email === email) logout();
            alert('Usuario eliminado exitosamente');
        } catch (err: any) {
            setError(err.message || 'Error al eliminar usuario');
            alert(err.message || 'Error al eliminar usuario');
        }
    };

    const totalAdmins = useMemo(() => users.filter(u => u.role === 'ADMIN').length, [users]);

    return (
        <div className="admin-page">
            {error && (
                <div style={{ 
                    backgroundColor: '#fee', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    marginBottom: '16px',
                    color: '#c00'
                }}>
                    {error}
                </div>
            )}

            <div className="admin-header">
                <h1>Perfil y Usuarios</h1>
            </div>

            <div className="profile-card" style={{ marginTop: 0 }}>
                <h2>Información del Administrador</h2>
                <div className="profile-info">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Rol:</strong> {user?.role}</p>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    Cargando usuarios...
                </div>
            ) : (
            <div className="profile-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Usuarios Registrados</h2>
                    <div style={{ color: 'var(--muted)' }}>Total: {users.length} · Admins: {totalAdmins}</div>
                </div>

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
                            {users.map(u => (
                                <tr key={u.email} style={{ borderTop: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>{u.email}</td>
                                    <td style={{ padding: '8px' }}>
                                        {editing === u.email ? (
                                            <select
                                                value={form.role}
                                                onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value as 'ADMIN' | 'USER' }))}
                                                className="form-input"
                                            >
                                                <option value="USER">Usuario</option>
                                                <option value="ADMIN">Admin</option>
                                            </select>
                                        ) : (
                                            <span className="badge">{u.role}</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                        {editing === u.email ? (
                                            <input
                                                type="password"
                                                value={form.password}
                                                onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                                                className="form-input"
                                                placeholder="Dejar vacío para no cambiar"
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
                </div>
            </div>
            )}
        </div>
    );
};