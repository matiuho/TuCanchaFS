import { useEffect, useState, type FC } from 'react';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { CourtForm } from '../canchas/components/CourtForm';
import { getAllCanchas, createCancha, updateCancha, deleteCancha as deleteCanchaApi } from '../services/canchasService';

export const AdminCourtsPage: FC = () => {
    const [canchas, setCanchas] = useState<CanchaProps[]>([]);
    const [editingCourt, setEditingCourt] = useState<CanchaProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar canchas desde el backend al montar
    useEffect(() => {
        loadCanchas();
    }, []);

    const loadCanchas = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllCanchas();
            setCanchas(data);
        } catch (err) {
            setError('Error al cargar canchas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCourt = async (newCourt: Omit<CanchaProps, 'id'>) => {
        try {
            setError(null);
            const created = await createCancha(newCourt);
            setCanchas(prev => [...prev, created]);
            alert('Cancha creada exitosamente');
        } catch (err: any) {
            setError(err.message || 'Error al crear cancha');
            alert(err.message || 'Error al crear cancha');
        }
    };

    const handleDeleteCourt = async (id: number) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta cancha?')) {
            return;
        }

        try {
            setError(null);
            await deleteCanchaApi(id);
            setCanchas(prev => prev.filter(cancha => cancha.id !== id));
            alert('Cancha eliminada exitosamente');
        } catch (err: any) {
            setError(err.message || 'Error al eliminar cancha');
            alert(err.message || 'Error al eliminar cancha');
        }
    };

    const handleEditCourt = (cancha: CanchaProps) => {
        setEditingCourt(cancha);
    };

    const handleUpdateCourt = async (updatedCourt: Omit<CanchaProps, 'id'>) => {
        if (!editingCourt) return;
        
        try {
            setError(null);
            const updated = await updateCancha(editingCourt.id, updatedCourt);
            setCanchas(prev => prev.map(cancha => 
                cancha.id === editingCourt.id ? updated : cancha
            ));
            setEditingCourt(null);
            alert('Cancha actualizada exitosamente');
        } catch (err: any) {
            setError(err.message || 'Error al actualizar cancha');
            alert(err.message || 'Error al actualizar cancha');
        }
    };

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

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    Cargando canchas...
                </div>
            ) : (
                <>
            <div className="admin-header">
                <h1>Administración de Canchas</h1>
                <div style={{ display: 'flex', gap: 8 }}>
                    {editingCourt ? (
                        <button className="btn secondary" onClick={() => setEditingCourt(null)}>
                            Cancelar Edición
                        </button>
                    ) : (
                        <button
                            className="btn"
                            onClick={() => {
                                setEditingCourt(null);
                                const el = document.getElementById('form-cancha');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                        >
                            Nueva Cancha
                        </button>
                    )}
                </div>
            </div>

            <div className="admin-content">
                <div className="admin-form-section" id="form-cancha">
                    <h2>{editingCourt ? 'Editar Cancha' : 'Agregar Nueva Cancha'}</h2>
                    <CourtForm 
                        key={editingCourt ? `edit-${editingCourt.id}` : 'new'}
                        onSubmit={editingCourt ? handleUpdateCourt : handleAddCourt}
                        initialData={editingCourt || undefined}
                    />
                </div>

                <div className="admin-list-section">
                    <h2>Canchas Existentes</h2>
                    <div className="courts-grid">
                        {canchas.map(cancha => (
                            <div key={cancha.id} className="court-item">
                                <div style={{ position: 'relative' }}>
                                    <img src={cancha.imagenUrl} alt={cancha.nombre} className="court-image" />
                                    {cancha.fotos && cancha.fotos.length > 0 && (
                                        <span style={{ position:'absolute', right:8, top:8, background: 'rgba(0,0,0,0.55)', color:'white', fontSize:12, padding:'2px 6px', borderRadius:999 }}>
                                            {cancha.fotos.length + 1} fotos
                                        </span>
                                    )}
                                </div>
                                <div className="court-info">
                                    <h3>{cancha.nombre}</h3>
                                    <p>Tipo: {cancha.tipo}</p>
                                    <p>Precio: ${cancha.precioHora}/hora</p>
                                    <p>Capacidad: {cancha.capacidad} jugadores</p>
                                </div>
                                <div className="court-actions">
                                    <button 
                                        className="btn small"
                                        onClick={() => handleEditCourt(cancha)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="btn small secondary"
                                        onClick={() => handleDeleteCourt(cancha.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </>
            )}
        </div>
    );
};